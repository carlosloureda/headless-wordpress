import React from 'react'

interface iButton {
  isLoading?: boolean
  children: React.ReactNode
  loadingText?: string
}

const Button = ({ isLoading = false, loadingText, children }: iButton): JSX.Element => {
  return (
    <button
      className="w-full bg-gray-900 hover:bg-gray-200 text-white hover:text-black font-bold py-2 px-4 mb-6 rounded"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? loadingText : children}
    </button>
  )
}

export default Button
