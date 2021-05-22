import React from 'react'
import useAuth from '../lib/hooks/useAuth'
import Router from 'next/router'

const LogoutPage = (): JSX.Element => {
  const { deleteAuthData } = useAuth()

  React.useEffect(() => {
    deleteAuthData()
    Router.push('/login')
  }, [deleteAuthData])

  return <h1>Login out</h1>
}

export default LogoutPage
