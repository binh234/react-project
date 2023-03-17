// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body

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
