import React from 'react'
import Link from 'next/link'
import { Menu } from './Menu'

const Header = (): JSX.Element => {
  return (
    <header className="py-4 bg-black">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white uppercase pl-4">
          <Link href="/">
            <a className="text-white hover:text-white hover:no-underline">Headless Wordpress</a>
          </Link>
        </h1>
        <Menu />
      </div>
    </header>
  )
}
export default Header
