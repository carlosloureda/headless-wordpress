import React, { useEffect } from 'react'
import Router from 'next/router'
import useAuth from '../../lib/hooks/useAuth'
import Link from 'next/link'

const DashboardPage = (): JSX.Element => {
  const { isLoggedIn, user, deleteAuthData, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      Router.push('/login')
    }
  }, [isLoading, isLoggedIn])

  const onLogout = (): void => {
    deleteAuthData()
    Router.push('/login')
  }

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
          <button
            className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            onClick={onLogout}
          >
            Logout
          </button>

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
