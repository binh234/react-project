import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { v4 as uuidv4 } from 'uuid'

export const client = createClient({
  projectId: 'vwi32sg5',
  dataset: 'production',
  apiVersion: '2023-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

export const createDocument = async (document: any) => {
  return client.create(document)
}

export const updateDocument = async (id: string, document: Object) => {
  return client.patch(id).set(document).commit()
}

export const deleteDocument = async (id: string) => {
  return client.delete(id)
}

export const uploadAsset = async (file: File) => {
  return client.assets.upload('file', file, {
    contentType: file.type,
    filename: file.name,
  })
}

export const subscribe = (query: string, params?: any) => {
  return client.listen(query, params)
}

export const likePost = async (like: boolean, userId: string, postId: string) => {
  return like
    ? client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [
          {
            _key: uuidv4(),
            _ref: userId,
          },
        ])
        .commit()
    : client
        .patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit()
}

export const urlFor = (source: any) => {
  return imageUrlBuilder(client).image(source)
}
