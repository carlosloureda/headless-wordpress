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
  featuredImage: FileList
}

const UploadProperty = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [uploading, setUploading] = React.useState(false)

  const [registerProperty] = useMutation(CREATE_PROPERTY, {
    errorPolicy: 'all',
    onCompleted: () => {
      // console.log('property uploaded: ', data)
    },
    onError: (error) => console.error('[UploadProperty] Error uploading property: ', error),
  })

  const onSubmit = (property: tProperty): void => {
    console.log('property: ', property)
    const featuredImage = property.featuredImage[0]
    console.log('typeof: ', typeof featuredImage)
    console.log('featuredImage: ', featuredImage)

    // const imgBody = new FormData()
    // imgBody.append('image', featuredImage)
    // console.log('imgBody: ', imgBody)

    // const data = new FormData()
    // const imagedata = property.featuredImage[0]
    // data.append('data', imagedata)

    // console.log('data: ', data)
    // console.log('imagedata: ', imagedata)

    // for (const pair of data.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    setUploading(true)
    registerProperty({
      variables: {
        title: property.title,
        description: property.description,
        featuredImage: featuredImage,
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
      <InputField
        type="file"
        id="featuredImage"
        options={{
          required: false,
        }}
        label="Best property photo!"
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
