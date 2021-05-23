import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import Form from '../ui/Form/Form'
import InputField from '../ui/Form/Input'
import Button from '../ui/Form/Button'

type SetPasswordFormData = {
  password: string
}

type SetPasswordFormProps = {
  onSubmit: (data: SetPasswordFormData) => void
  error: string
}

const SetPasswordForm = ({ onSubmit, error }: SetPasswordFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className="flex justify-center items-center w-full">
      <Form onSubmit={handleSubmit(onSubmit)}>
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
            Did you remember your password?
            <Link href="/login">
              <a className="text-indigo-700 ml-2">Login</a>
            </Link>
          </p>
        </div>
        <div>
          <Button>Update</Button>
        </div>
      </Form>
    </div>
  )
}

export default SetPasswordForm
