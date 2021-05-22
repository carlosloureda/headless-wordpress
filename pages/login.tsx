import React from 'react'
import { useMutation } from '@apollo/client'
import { WP_LOGIN_USER } from '../lib/queries/auth'
import LoginForm from '../lib/components/auth/LoginForm'
import useAuth from '../lib/hooks/useAuth'
import { tLoginUser } from '../lib/types/user'
import Router from 'next/router'

const LoginPage = (): JSX.Element => {
  const { setAuthData } = useAuth()

  const [login, { loading, error }] = useMutation(WP_LOGIN_USER, {
    onCompleted: (data) => {
      setAuthData({
        authToken: data.login.authToken,
        refreshToken: data.login.user.jwtRefreshToken,
        user: data.login.user,
        isLoading: false,
      })
      Router.push('/dashboard')
    },
    onError: (error) => {
      console.error(`[LoginPage]: ${error.message}`)
    },
  })

  const onSubmit = (data: tLoginUser): void => {
    login({
      variables: {
        username: data.username,
        password: data.password,
      },
    })
  }

  if (loading) return <p>Loging in ...!</p>
  return <LoginForm onSubmit={onSubmit} error={error?.message} />
}

export default LoginPage
