import { RegisterOptions, FieldErrors } from 'react-hook-form'

interface iInput {
  id: string
  options: RegisterOptions
  label: string
  register: (string, RegisterOptions) => void
  errors: FieldErrors
  type?: string
}

const InputField = ({
  id,
  options = {},
  label,
  register,
  errors,
  type = 'input',
}: iInput): JSX.Element => {
  return (
    <div>
      <label className="block mb-2 text-gray-600" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(id, options)}
        className="w-full p-2 mb-6 text-gray-700 border-b-2 border-indigo-500 outline-none bg-transparent focus:bg-blue-100"
        type={type}
        name={id}
      />
      {errors[id] && errors[id].type === 'required' && (
        <span className="text-red-300">This field is required</span>
      )}
    </div>
  )
}

export default InputField
