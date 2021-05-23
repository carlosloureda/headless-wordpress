import { gql } from '@apollo/client'

const GET_PROPERTY_BY_ID = gql`
  query PropertyByID($id: ID!) {
    property(id: $id, idType: ID) {
      id
      title
      propertyFields {
        description
      }
    }
  }
`

export { GET_PROPERTY_BY_ID }
