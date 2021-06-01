import { gql } from '@apollo/client'

// only query "mine" careful as now we get all and by DRAFT
const GET_PUBLIC_PROPERTIES = gql`
  query Properties {
    properties(where: { stati: [PUBLISH] }) {
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

const GET_ALL_PROPERTIES = gql`
  query Properties {
    properties(where: { stati: [PUBLISH, DRAFT, PRIVATE] }) {
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

const GET_MY_PROPERTIES = gql`
  query Properties($authorId: Int!) {
    properties(where: { stati: [PUBLISH, DRAFT, PRIVATE], author: $authorId }) {
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
  mutation CreateCustomProperty($title: String!, $description: String, $featuredImage: Upload!) {
    createCustomProperty(
      input: { title: $title, description: $description, featuredImage: $featuredImage }
    ) {
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

export {
  GET_PUBLIC_PROPERTIES,
  GET_ALL_PROPERTIES,
  GET_MY_PROPERTIES,
  GET_PROPERTY_BY_ID,
  CREATE_PROPERTY,
  UPDATE_PROPERTY,
}
