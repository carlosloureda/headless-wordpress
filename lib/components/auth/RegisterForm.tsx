import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { RegisterUserType } from '../../types/user'

type RegisterFormProps = {
  onSubmit: (data: RegisterUserType) => void
  error: string
}

const RegisterForm = ({ onSubmit, error }: RegisterFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block mb-2 text-indigo-500" htmlFor="username">
          Username
        </label>
        <input
          {...register('username', { required: true })}
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          type="text"
          name="username"
        />
        {errors.username && errors.username.type === 'required' && (
          <span className="text-red-300">This field is required</span>
        )}
      </div>
      <div>
        <label className="block mb-2 text-indigo-500" htmlFor="email">
          Email
        </label>
        <input
          {...register('email', { required: true })}
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          type="email"
          name="email"
        />
        {errors.email && errors.email.type === 'required' && (
          <span className="text-red-300">This field is required</span>
        )}
      </div>
      <div>
        <label className="block mb-2 text-indigo-500" htmlFor="password">
          Password
        </label>
        <input
          {...register('password', { required: true })}
          className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
          type="password"
          name="password"
        />
        {errors.password && errors.password.type === 'required' && (
          <span className="text-red-300">This field is required</span>
        )}
      </div>
      {error && (
        <div>
          <p className="text-red-300">Register error: {error}</p>
        </div>
      )}
      <div>
        <p>
          Already registered?
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
      <div>
        <button
          className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
