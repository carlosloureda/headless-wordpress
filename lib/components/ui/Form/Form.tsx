import React from 'react'

interface iForm {
  onSubmit: () => void
  children: React.ReactNode
}

const Form = ({ onSubmit, children }: iForm): JSX.Element => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        border: '1px solid black',
        borderRadius: '5px',
        padding: '2em',
        minWidth: '40%',
      }}
    >
      {children}
    </form>
  )
}

export default Form
