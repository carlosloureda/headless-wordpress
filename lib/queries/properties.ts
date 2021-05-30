import { gql } from '@apollo/client'

// only query "mine" careful as now we get all and by DRAFT
const GET_PROPERTIES = gql`
  query Properties {
    properties(where: { stati: [PUBLISH, DRAFT] }) {
      nodes {
        id
        databaseId
        title
        slug
        status
        propertyFields {
          description
        }
      }
    }
  }
`

const GET_PROPERTY_BY_ID = gql`
  query PropertyByID($id: ID!) {
    property(id: $id, idType: ID) {
      id
      databaseId
      title
      propertyFields {
        description
      }
    }
  }
`

const CREATE_PROPERTY = gql`
  mutation CreateCustomProperty($title: String!, $description: String) {
    createCustomProperty(input: { title: $title, description: $description }) {
      propertySubmitted
      description
      property {
        id
        title
        slug
        status
        propertyFields {
          description
        }
      }
    }
  }
`

const UPDATE_PROPERTY = gql`
  mutation UpdateCustomProperty(
    $id: String!
    $title: String
    $description: String
    $slug: String
    $status: String
  ) {
    updateCustomProperty(
      input: { id: $id, description: $description, title: $title, slug: $slug, status: $status }
    ) {
      propertySubmitted
      description
    }
  }
`

export { GET_PROPERTIES, GET_PROPERTY_BY_ID, CREATE_PROPERTY, UPDATE_PROPERTY }
