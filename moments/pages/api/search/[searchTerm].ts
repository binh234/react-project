// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { searchPostsQuery, searchUsersQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { searchTerm = '' } = req.query
      const videosQuery = searchPostsQuery(searchTerm)
      const usersQuery = searchUsersQuery(searchTerm)

      const videos = await client.fetch(videosQuery)
      const accounts = await client.fetch(usersQuery)
      res.status(200).json({
        videos: videos,
        accounts: accounts
      })
    }
  } catch (error: any) {
    res.status(404).json(error)
  }
}
