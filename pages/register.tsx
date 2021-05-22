import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Router from 'next/router'
import useAuth from '../lib/hooks/useAuth'
import { WP_REGISTER_USER } from '../lib/queries/auth'
import RegisterForm from '../lib/components/auth/RegisterForm'
import { User } from '../lib/types/user'

type DataUserResponse = {
  registerUser: DataUserResponseRegisterUser
}

type DataUserResponseRegisterUser = {
  user: User
}

/**
 * The register user page (General purpose)
 */
const RegisterPage = (): JSX.Element => {
  const { isLoggedIn, setAuthData } = useAuth()

  const [registerUser, { loading, error }] = useMutation(WP_REGISTER_USER, {
    onCompleted: (data: DataUserResponse) => {
      setAuthData({
        authToken: data.registerUser.user.authToken,
        refreshToken: data.registerUser.user.jwtRefreshToken,
        user: data.registerUser.user,
        isLoading: false,
      })
      Router.push('/dashboard')
    },
    onError: (error) => {
      console.error(`[RegisterPage]: ${error.message}`)
    },
  })

  const onSubmit = (data: User): void => {
    registerUser({
      variables: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    })
  }

  useEffect(() => {
    if (isLoggedIn) {
      Router.push('/dashboard')
    }
  }, [isLoggedIn])

  if (loading) return <p>Registering ...!</p>

  return <RegisterForm onSubmit={onSubmit} error={error?.message} />
}

export default RegisterPage
