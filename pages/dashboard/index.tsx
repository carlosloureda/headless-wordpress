import React, { useEffect } from 'react'
import Router from 'next/router'
import useAuth from '../../lib/hooks/useAuth'
import PageLoader from '../../lib/components/ui/loaders/PageLoader'

import UploadProperty from '../../lib/components/example/properties/UploadProperty'
import MyProperties from '../../lib/components/example/properties/MyProperties'

// TODO: upload property  only for an "owner" user
const DashboardPage = (): JSX.Element => {
  const { isLoggedIn, user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      Router.push('/login')
    }
  }, [isLoading, isLoggedIn])

  if (isLoading || !isLoggedIn) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-col w-full mx-20 my-8">
      <h1>Dashboard</h1>
      <h2>{`Welcome ${user?.name}!`}</h2>
      <div className="flex flex-col justify-center items-center w-full">
        <UploadProperty />
        <MyProperties />
      </div>
    </div>
  )
}

export default DashboardPage
