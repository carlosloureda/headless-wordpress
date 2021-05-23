import React from 'react'
import { useMutation } from '@apollo/client'
import Link from 'next/link'

import { WP_SEND_PASSWORD_RESET } from '../lib/queries/auth'
import ForgotPasswordForm from '../lib/components/auth/ForgotPasswordForm'

type ForgotPasswordProps = {
  username: string
}

const ForgotPasswordPage = (): JSX.Element => {
  const [emailSent, setEmailSent] = React.useState(false)

  const [forgotPassword, { loading, error }] = useMutation(WP_SEND_PASSWORD_RESET, {
    onCompleted: () => {
      setEmailSent(true)
    },
    onError: (error) => {
      console.log('error: ', error)
    },
  })

  const onSubmit = (data: ForgotPasswordProps): void => {
    forgotPassword({
      variables: {
        username: data.username,
      },
    })
  }

  if (loading) return <p>Sending email in ...!</p>

  if (emailSent)
    return (
      <div>
        <p>Email sent. Check your inbox!</p>
        <Link href="/login">
          <a>Go to Login</a>
        </Link>
      </div>
    )

  return <ForgotPasswordForm onSubmit={onSubmit} error={error?.message} />
}

export default ForgotPasswordPage
