// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { v4 as uuidv4 } from 'uuid'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).send({
        message: 'Authorization required',
      })
    }
    const { userId, postId, like } = req.body
    const { user } = session
    if (user._id != userId) {
      return res.status(401).send({
        message: 'Authorization mismatch! You can only like this post by yourself!',
      })
    }

    try {
      const data = like
        ? await client
            .patch(postId)
            .setIfMissing({ likes: [] })
            .insert('after', 'likes[-1]', [
              {
                _key: uuidv4(),
                _ref: userId,
              },
            ])
            .commit()
        : await client
            .patch(postId)
            .unset([`likes[_ref=="${userId}"]`])
            .commit()
      res.status(200).json(data)
    } catch (e) {
      console.log('Error when like post: ', e)
      res.status(404).json(e)
    }
  }
}
