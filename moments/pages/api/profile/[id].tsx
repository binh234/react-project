// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { MAX_RESULT } from '@/utils/config'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    let { id } = req.query
    const query = singleUserQuery(id!)

    try {
      const users = await client.fetch(query)
      res.status(200).json(users[0])
    } catch (e) {
      console.log('Error when retrieve user data: ', e)
      res.status(400).json(e)
    }
  }
}
