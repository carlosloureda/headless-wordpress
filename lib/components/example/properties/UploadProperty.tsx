import React from 'react'
import Form from '../../ui/Form/Form'
import InputField from '../../ui/Form/Input'
import Button from '../../ui/Form/Button'
import { useForm } from 'react-hook-form'
import { CREATE_PROPERTY } from '../../../queries/properties'
import { useMutation } from '@apollo/client'

type tProperty = {
  title: string
  description: string
}

const UploadProperty = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [uploading, setUploading] = React.useState(false)

  const [registerProperty] = useMutation(CREATE_PROPERTY, {
    onCompleted: () => {
      // console.log('property uploaded: ', data)
    },
    onError: (error) => console.error('[UploadProperty] Error uploading property: ', error),
  })

  const onSubmit = (property: tProperty): void => {
    setUploading(true)
    registerProperty({
      variables: {
        title: property.title,
        description: property.description,
      },
    })
    setUploading(false)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="title"
        options={{
          required: true,
        }}
        label="Title"
        register={register}
        errors={errors}
      />
      <InputField
        id="description"
        options={{
          required: true,
        }}
        label="Description"
        register={register}
        errors={errors}
      />
      <div>
        <Button isLoading={uploading} loadingText="Uploading!">
          Upload
        </Button>
      </div>
    </Form>
  )
}

export default UploadProperty
