// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { topicPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { topic } = req.query
    const query = topicPostsQuery(topic!)

    try {
      const videos = await client.fetch(query)
      res.status(200).json(videos)
    } catch (e) {
      console.log('Error when retrieve topic data: ', e)
      res.status(404).json(e)
    }
  }
}
