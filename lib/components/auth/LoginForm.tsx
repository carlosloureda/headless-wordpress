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
}: {
  onSubmit: (data: tLoginUser) => void
  error: string
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { isLoggedIn, user, deleteAuthData } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      Router.push('/dashboard')
    }
  }, [isLoggedIn])

  const onLogout = (): void => {
    deleteAuthData()
  }

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome {user.username}</h1>
        <div>
          <button
            className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

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
          <Button>Login</Button>
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
