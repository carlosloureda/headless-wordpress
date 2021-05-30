/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { DOMElement } from 'react'

import { useMutation, useQuery } from '@apollo/client'

import { GET_PROPERTIES, UPDATE_PROPERTY } from '../../../../lib/queries/properties'

// type tPropertyFields = {
//   description: string
// }
// type tProperty = {
//   title: string
//   propertyFields: tPropertyFields
//   id: string
// }

// const MyProperties = ({ properties }: { properties?: [tProperty] }): JSX.Element => {
const MyProperties = (): JSX.Element => {
  const { data } = useQuery(GET_PROPERTIES, {
    fetchPolicy: 'no-cache',
  })

  const [updateProperty] = useMutation(UPDATE_PROPERTY, {
    onCompleted: (data) => {
      // console.log('property updated: ', data)
    },
    onError: (error) => console.error('error updating property: ', error),
  })

  const onChangeVisibility = (
    e: React.SyntheticEvent<HTMLButtonElement>,
    isVisible: boolean
  ): void => {
    const postId = (e.target as HTMLButtonElement).dataset['propertyId']
    updateProperty({
      variables: {
        id: postId,
        status: isVisible ? `publish` : `private`,
      },
    })
  }

  const onDelete = (e: React.SyntheticEvent<HTMLButtonElement>): void => {
    // console.log(`Delete : `, e)
  }

  return (
    <>
      <h1>My list of properties</h1>
      <ul>
        {data?.properties?.nodes?.map((property) => {
          return (
            <li key={property.databaseId}>
              <div>
                {property.title} - {property.propertyFields.description} - {property.status}
              </div>
              <button
                className="mx-4"
                data-property-id={property.databaseId}
                onClick={(e) => onChangeVisibility(e, true)}
              >
                activate
              </button>
              <button
                className="mx-4"
                data-property-id={property.databaseId}
                onClick={(e) => onChangeVisibility(e, false)}
              >
                deactivate
              </button>
              <button data-property-id={property.databaseId} onClick={onDelete}>
                remove
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default MyProperties
