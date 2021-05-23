import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import useAuth from '../../../lib/hooks/useAuth'

import Form from '../ui/Form/Form'
import Button from '../ui/Form/Button'
import InputField from '../ui/Form/Input'

interface ForgotPasswordFields {
  username: string
}

type ForgotPasswordFormProps = {
  onSubmit: (data: ForgotPasswordFields) => void
  error: string
}

const ForgotPasswordForm = ({ onSubmit, error }: ForgotPasswordFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { isLoggedIn } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      Router.push('/dashboard')
    }
  }, [isLoggedIn])

  // SHOW LOADER ..

  return (
    <div className="flex justify-center items-center w-full">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="username"
          options={{
            required: true,
          }}
          label="Username"
          register={register}
          errors={errors}
        />
        {error && (
          <div>
            <p className="text-red-300">Error: {error}</p>
          </div>
        )}
        <div>
          <Button>Send</Button>
        </div>
      </Form>
    </div>
  )
}

export default ForgotPasswordForm
