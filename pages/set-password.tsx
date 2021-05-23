import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import { WP_RESET_USER_PASSWORD } from '../lib/queries/auth'
import SetPasswordForm from '../lib/components/auth/SetPasswordForm'

type SetPasswordProps = {
  password: string
}

const SetPasswordPage = (): JSX.Element => {
  const router = useRouter()
  const { key, login } = router.query

  const [setPassword, { error }] = useMutation(WP_RESET_USER_PASSWORD, {
    onCompleted: () => {
      alert('Password reset!')
    },
    onError: (error) => {
      console.log('error: ', error.message)
    },
  })

  const onSubmit = (data: SetPasswordProps): void => {
    setPassword({
      variables: {
        key,
        login,
        password: data.password,
      },
    })
  }

  return <SetPasswordForm onSubmit={onSubmit} error={error?.message} />
}

export default SetPasswordPage
