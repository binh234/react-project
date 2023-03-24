// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { MAX_RESULT } from '@/utils/config'
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      let { maxResults, lastCreatedAt } = req.query
      const parsedMaxResults = maxResults ? parseInt(maxResults as string, 10) : MAX_RESULT
      if (Array.isArray(lastCreatedAt)) {
        lastCreatedAt = lastCreatedAt[0]
      }
      const query = allPostsQuery(parsedMaxResults, lastCreatedAt)

      const data = await client.fetch(query)
      res.status(200).json(data)
    }
  } catch (error: any) {
    res.status(400).json(error)
  }
}
