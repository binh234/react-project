import { useState } from 'react'
import { useGetIdentity } from '@refinedev/core'
import { useForm } from '@refinedev/react-hook-form'
import { FieldValues } from 'react-hook-form'
import { Form } from '../../components'
import { UserProps } from '../../interfaces/common'

export const PropertyCreate: React.FC = () => {
  const { data: user } = useGetIdentity<UserProps>()
  const [propertyImage, setPropertyImage] = useState({ name: '', url: '' })
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm()

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve) => {
        const fileReader = new FileReader()
        fileReader.onload = () => resolve(fileReader.result as string)
        fileReader.readAsDataURL(readFile)
      })

    reader(file).then((result: string) => setPropertyImage({ name: file?.name, url: result }))
  }

  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) return alert('Please select an image')

    await onFinish({ ...data, photo: propertyImage.url, email: user?.email })
  }

  return (
    <Form
      type="create"
      register={register}
      formLoading={formLoading}
      onFinish={onFinish}
      handleSubmit={handleSubmit}
      propertyImage={propertyImage}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
    />
  )
}
