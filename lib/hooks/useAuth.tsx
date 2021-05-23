import React, { useContext } from 'react'
// import gql from 'graphql-tag'
// import { useQuery } from '@apollo/client'
import { useReactiveVar } from '@apollo/client'

import { apolloAuthData, client } from '../services/apollo'
import { setPersistedAuthData, deletePersistedAuthData } from '../services/auth'
import useAuthTokenRefresher from './useAuthTokenRefresher'
import { IAuthData, User as IUser } from '../types/user'

interface AuthContextProps {
  isLoggedIn: boolean
  user: IUser
  isLoading: boolean
  setAuthData: (authData: IAuthData) => void
  deleteAuthData: () => void
  setIsLoading: (isLoading: boolean) => void
}

// const GET_APOLLO_AUTH_DATA = gql`
//   query getApolloAuthData {
//     apolloAuthData @client
//   }
// `

export const setAuthData = (authData: IAuthData): void => {
  const { refreshToken, user } = authData
  apolloAuthData(authData)
  delete user.jwtAuthToken
  delete user.jwtRefreshToken
  setPersistedAuthData({ refreshToken, user })
}

export const setIsLoading = (isLoading: boolean): void => {
  const prevAuthData = apolloAuthData()
  apolloAuthData({
    ...prevAuthData,
    isLoading,
  })
}

export const deleteAuthData = (): void => {
  apolloAuthData({
    authToken: null,
    refreshToken: null,
    user: null,
    isLoading: false,
  })
  client.resetStore()
  deletePersistedAuthData()
}

const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  user: null,
  isLoading: true,
  setAuthData,
  deleteAuthData,
  setIsLoading,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  // TODO: the query does not "work", it shoudl be const {data : {apolloAuthData}} ....
  // const { data } = useQuery(GET_APOLLO_AUTH_DATA) // "Apollo makeVars session"

  const authData = useReactiveVar(apolloAuthData)
  const isLoggedIn = !!authData?.authToken ?? false
  const user = authData?.user ?? null
  const isLoading = authData.isLoading

  useAuthTokenRefresher(authData, setAuthData, deleteAuthData, setIsLoading)

  const value = {
    isLoggedIn,
    user,
    setAuthData,
    deleteAuthData,
    isLoading: isLoading,
    setIsLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = (): AuthContextProps => useContext(AuthContext)

export default useAuth
