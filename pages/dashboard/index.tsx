import React, { useEffect } from 'react'
import Router from 'next/router'
import useAuth from '../../lib/hooks/useAuth'
import Link from 'next/link'

const DashboardPage = (): JSX.Element => {
  const { isLoggedIn, user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      Router.push('/login')
    }
  }, [isLoading, isLoggedIn])

  if (isLoading || !isLoggedIn) {
    // return <FullPageLoader />;
    return <p>Loading ...</p>
  }

  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <h2>{`Welcome ${user?.name}!`}</h2>
        <div>
          <Link href="/examples/authorization">
            <a>
              <p>Go to ...</p>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
