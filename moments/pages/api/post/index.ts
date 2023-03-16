// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '@/utils/client'
import {allPostsQuery} from '@/utils/queries'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const query = allPostsQuery()

      const data = await client.fetch(query)
      res.status(200).json(data)
    } else if (req.method === 'POST') {
      const document = req.body
      await client.create(document)
      res.status(200).json('Video created')
    }
  } catch (error: any) {
    res.status(404).json(error)
  }
}
