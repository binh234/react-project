// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { MAX_RESULT } from '@/utils/config'
import { searchPostsQuery, searchUsersQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      let { searchTerm = '', type = 'post', maxResults = '50', lastCreatedAt, lastId } = req.query
      const parsedMaxResults = maxResults ? parseInt(maxResults as string, 10) : MAX_RESULT
      if (type === 'post') {
        if (Array.isArray(lastCreatedAt)) {
          lastCreatedAt = lastCreatedAt[0]
        }
        const videosQuery = searchPostsQuery(searchTerm, parsedMaxResults, lastCreatedAt)
        const videos = await client.fetch(videosQuery)
        res.status(200).json(videos)
      } else if (type === 'user') {
        if (Array.isArray(lastId)) {
          lastId = lastId[0]
        }
        const usersQuery = searchUsersQuery(searchTerm, parsedMaxResults, lastId)
        const accounts = await client.fetch(usersQuery)
        res.status(200).json(accounts)
      } else {
        res.status(400).json("Bad request. Set type to 'post' or 'user' to search")
      }
    }
  } catch (error: any) {
    res.status(400).json(error)
  }
}
