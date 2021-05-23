import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { RegisterUserType } from '../../types/user'
import Button from '../ui/Form/Button'
import Form from '../ui/Form/Form'
import InputField from '../ui/Form/Input'

type RegisterFormProps = {
  onSubmit: (data: RegisterUserType) => void
  error: string
  loading: boolean
}

const RegisterForm = ({ onSubmit, error, loading }: RegisterFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
          id="email"
          type="email"
          options={{
            required: true,
          }}
          label="Email"
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
            <p className="text-red-300">Register error: {error}</p>
          </div>
        )}
        <div>
          <p className="pb-8">
            Already registered?
            <Link href="/login">
              <a className="text-indigo-700 ml-2">Login</a>
            </Link>
          </p>
        </div>
        <div>
          <Button isLoading={loading} loadingText="Registering">
            Register
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default RegisterForm
