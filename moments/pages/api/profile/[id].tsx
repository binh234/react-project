// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query
    const query = singleUserQuery(id!)
    const userVideosQuery = userCreatedPostsQuery(id!)
    const userLikedVideosQuery = userLikedPostsQuery(id!)

    try {
      const users = await client.fetch(query)
      const userVideos = await client.fetch(userVideosQuery)
      const userLikedVideos = await client.fetch(userLikedVideosQuery)
      res.status(200).json({
        user: users[0],
        userVideos,
        userLikedVideos,
      })
    } catch (e) {
      console.log('Error when retrieve user data: ', e)
      res.status(404).json(e)
    }
  }
}
