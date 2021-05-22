import React from 'react'

interface iButton {
  children: React.ReactNode
}

const Button = ({ children }: iButton): JSX.Element => {
  return (
    <button
      className="w-full bg-gray-900 hover:bg-gray-200 text-white hover:text-black font-bold py-2 px-4 mb-6 rounded"
      type="submit"
    >
      {children}
    </button>
  )
}

export default Button
