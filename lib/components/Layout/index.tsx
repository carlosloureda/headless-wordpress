import React from 'react'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Head>
        <title>Wordpress Headless</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Boilerplate for Headless Wordpress using NextJS" />
      </Head>
      <Header />
      <main className="flex flex-row flex-1 w-full">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
