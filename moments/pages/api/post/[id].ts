// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { postDetailQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query
    const query = postDetailQuery(id!)

    try {
      const data = await client.fetch(query)
      res.status(200).json(data[0])
    } catch (e) {
      console.log('Error when retrieve post data: ', e)
      res.status(404).json(e)
    }
  } else if (req.method === 'PUT') {
    const document = req.body
    const { id }: any = req.query

    try {
      const data = await client
        .patch(id)
        .set(document)
        .commit()
      res.status(200).json(data)
    } catch (e) {
      console.log('Error when updating post: ', e)
      res.status(404).json(e)
    }
  } else if (req.method === 'DELETE') {
    const { id }: any = req.query

    try {
      await client.delete(id)
      res.status(200).json({ message: 'delete successful' })
    } catch (e) {
      console.log('Error when deleting post: ', e)
      res.status(404).json(e)
    }
  }
}
