// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { MAX_RESULT } from '@/utils/config'
import { suggestedUsersQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let { maxResults, lastId } = req.query
    const parsedMaxResults = maxResults ? parseInt(maxResults as string, 10) : MAX_RESULT
    if (Array.isArray(lastId)) {
      lastId = lastId[0]
    }
    try {
      const data = await client.fetch(suggestedUsersQuery(parsedMaxResults, lastId))
      res.status(200).json(data)
    } catch (e) {
      console.log('Error: ', e)
      res.status(400).json(e)
    }
  }
}
