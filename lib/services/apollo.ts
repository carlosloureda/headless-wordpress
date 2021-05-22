import { makeVar, ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import decode from 'jwt-decode'

import { getPersistedAuthData } from './auth'
import { setAuthData, deleteAuthData } from '../hooks/useAuth'

const GRAPHQL_URL = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`
const isBrowser = typeof window !== `undefined`
const persistedAuthData = isBrowser ? getPersistedAuthData() : null

/**
 * Reactive variable that stores auth data.
 * Docs: https://www.apollographql.com/docs/react/local-state/reactive-variables/
 */
export const apolloAuthData = makeVar({
  authToken: null,
  refreshToken: persistedAuthData?.refreshToken || null,
  user: persistedAuthData?.user || null,
  isLoading: true,
})

interface AuthToken {
  name: string
  exp: number
}

interface FetchResponse {
  authToken: string
}

/**
 * Gets the current timestamp in seconds
 * @returns {number} The current time in seconds format (timestamp)
 */
const getCurrentTimestampInSeconds = (): number => Math.floor(Date.now() / 1000)

/**
 * Check if a JWT token is expired
 * @param {string} token The token to be analyzed
 * @returns {boolean} True if the token is expired, false otherwise
 */
const isTokenExpired = (token: string): boolean =>
  decode<AuthToken>(token).exp <= getCurrentTimestampInSeconds()

/**
 * Refresh auth token if it is expired.
 */
const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'access_token',
  isTokenValidOrUndefined: () => {
    const { authToken } = apolloAuthData()
    return !authToken || !isTokenExpired(authToken)
  },
  fetchAccessToken: () => {
    const { refreshToken } = apolloAuthData()

    const query = `
          mutation refreshJwtAuthToken($input: RefreshJwtAuthTokenInput!) {
              refreshJwtAuthToken(input: $input) {
                  authToken
              }
          }
      `

    return fetch(GRAPHQL_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          input: {
            clientMutationId: uuidv4(),
            jwtRefreshToken: refreshToken || ``,
          },
        },
      }),
    })
  },

  handleFetch: (response: FetchResponse) => {
    const { authToken } = response
    setAuthData({ ...apolloAuthData(), authToken })
  },
  handleError: (error) => {
    console.error(error)
    deleteAuthData()
  },
})

/**
 * Include auth token in request headers.
 */
const authLink = setContext((_, { headers }) => {
  const { authToken } = apolloAuthData()

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : ``,
    },
  }
})

/**
 * Handle errors.
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  if (networkError) console.error(`[Network error]: ${networkError}`)
})

/**
 * Update the authToken and refreshToken with the updated tokens
 * sent back in the response headers.
 */
const tokenUpdateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext()

    if (headers) {
      const authToken = headers.get('x-jwt-auth')
      const refreshToken = headers.get('x-jwt-refresh')

      if (authToken) {
        setAuthData({ ...apolloAuthData(), authToken })
      }

      if (refreshToken) {
        setAuthData({ ...apolloAuthData(), refreshToken })
      }
    }

    return response
  })
})

/**
 * Handle HTTP requests.
 */
const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
})

// https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        apolloAuthData: {
          read() {
            return apolloAuthData()
          },
        },
      },
    },
  },
})

export const link = ApolloLink.from([
  tokenRefreshLink,
  authLink,
  errorLink,
  tokenUpdateLink,
  httpLink,
])

export const client = new ApolloClient({
  link,
  cache,
})
