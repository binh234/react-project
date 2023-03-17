// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

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
  } else if (req.method === 'PUT') {
    const { comment, userId } = req.body
    const { id }: any = req.query

    try {
      const data = await client
        .patch(id)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment: comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: userId,
            },
          },
        ])
        .commit()
      res.status(200).json(data)
    } catch (e) {
      console.log('Error when adding comment: ', e)
      res.status(404).json(e)
    }
  }
}
