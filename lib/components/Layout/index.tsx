import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Header />
      <div
        style={{
          paddingBottom: '2.5em',
        }}
      >
        {children}
      </div>

      <Footer />
    </div>
  )
}

export default Layout
