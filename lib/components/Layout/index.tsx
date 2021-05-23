import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Header />
      <main
        className="flex flex-row flex-1"
        style={{
          width: '100%',
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
