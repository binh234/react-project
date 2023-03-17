// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { searchPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { searchTerm = "" } = req.query
      const videosQuery = searchPostsQuery(searchTerm)

      const data = await client.fetch(videosQuery)
      res.status(200).json(data)
    }
  } catch (error: any) {
    res.status(404).json(error)
  }
}
