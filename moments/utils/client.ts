import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'vwi32sg5',
  dataset: 'production',
  apiVersion: '2023-03-10',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

export const urlFor = (source: any) => {
  return imageUrlBuilder(client).image(source)
}
