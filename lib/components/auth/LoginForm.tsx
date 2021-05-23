import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Router from 'next/router'
import useAuth from '../../../lib/hooks/useAuth'
import { tLoginUser } from '../../../lib/types/user'
import Form from '../ui/Form/Form'
import InputField from '../ui/Form/Input'
import Button from '../ui/Form/Button'

const LoginForm = ({
  onSubmit,
  error,
  loading,
}: {
  onSubmit: (data: tLoginUser) => void
  error: string
  loading: boolean
}): JSX.Element => {
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
        <InputField
          id="password"
          type="password"
          options={{
            required: true,
          }}
          label="Password"
          register={register}
          errors={errors}
        />
        {error && (
          <div>
            <p className="text-red-300">Loggin Error: {error}</p>
          </div>
        )}
        <div>
          <p className="pb-2">
            Are you new?
            <Link href="/register">
              <a className="text-indigo-700 ml-2">Register</a>
            </Link>
          </p>
          <p className="pb-8">
            Forgot password?
            <Link href="/forgot-password">
              <a className="text-indigo-700 ml-2">Recover</a>
            </Link>
          </p>
        </div>
        <div>
          <Button isLoading={loading} loadingText="Loging in">
            Login
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
