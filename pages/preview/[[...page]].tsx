import React from 'react'
import { GET_PROPERTY_BY_ID } from '../../lib/queries/properties'
import { useQuery } from '@apollo/client'
import { useUriInfo } from '@wpengine/headless/next'
import { useRouter } from 'next/router'

import Post from '../../lib/components/example/Post'
import PropertyScreen from '../../lib/screens/Property'
import { gql } from '@apollo/client'
import PageLoader from '../../lib/components/ui/loaders/PageLoader'

interface iPropertyFields {
  description: string
}

interface iProperty {
  id: string
  title: string
  propertyFields: iPropertyFields
}

interface iData {
  property: iProperty
}

const useParsePreviewURL = (): [string, iData] => {
  const pageInfo = useUriInfo()
  const router = useRouter()
  const { page, post_type } = router.query

  let query = gql`
    query PostByID($id: ID!) {
      post(id: $id, idType: ID) {
        id
        title
      }
    }
  `
  let type = ''
  if (page) {
    if (page[0].startsWith('property')) {
      query = GET_PROPERTY_BY_ID
      type = 'property'
    }
  } else if (post_type) {
    if (post_type === 'property') {
      query = GET_PROPERTY_BY_ID
      type = 'property'
    }
  }

  const { data } = useQuery(query, {
    variables: { id: pageInfo?.id },
  })
  return [type, data]
}

export default function Page(): JSX.Element {
  const [type, data] = useParsePreviewURL()

  if (!type || !data) {
    return <PageLoader title={`Loading Preview for ${type}`} />
  }

  if (type === 'property') {
    return <PropertyScreen property={data.property} />
  } else if (type == 'post') {
    return (
      <div>
        <h2>Preview page</h2>
        <Post />
      </div>
    )
  }
}
