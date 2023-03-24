// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { MAX_RESULT } from '@/utils/config'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      let { id, maxResults, lastCreatedAt } = req.query
      const parsedMaxResults = maxResults ? parseInt(maxResults as string, 10) : MAX_RESULT
      if (Array.isArray(lastCreatedAt)) {
        lastCreatedAt = lastCreatedAt[0]
      }
      const userVideosQuery = userCreatedPostsQuery(id!, parsedMaxResults, lastCreatedAt)

      const userVideos = await client.fetch(userVideosQuery)
      res.status(200).json(userVideos)
    } catch (e) {
      console.log('Error when retrieve user data: ', e)
      res.status(400).json(e)
    }
  }
}
