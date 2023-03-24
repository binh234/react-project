// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { MAX_RESULT } from '@/utils/config'
import { topicPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let { topic, maxResults, lastCreatedAt } = req.query
    const parsedMaxResults = maxResults ? parseInt(maxResults as string, 10) : MAX_RESULT
    if (Array.isArray(lastCreatedAt)) {
      lastCreatedAt = lastCreatedAt[0]
    }
    const query = topicPostsQuery(topic!, parsedMaxResults, lastCreatedAt)

    try {
      const videos = await client.fetch(query)
      res.status(200).json(videos)
    } catch (e) {
      console.log('Error when retrieve topic data: ', e)
      res.status(400).json(e)
    }
  }
}
