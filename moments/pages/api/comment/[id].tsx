// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { MAX_COMMENT_RESULT } from '@/utils/config'
import { postCommentsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      let { id, maxResults, lastCreatedAt } = req.query
      const parsedMaxResults = maxResults ? parseInt(maxResults as string, 10) : MAX_COMMENT_RESULT
      if (Array.isArray(lastCreatedAt)) {
        lastCreatedAt = lastCreatedAt[0]
      }
      const query = postCommentsQuery(id!, parsedMaxResults, lastCreatedAt)
      const data = await client.fetch(query)
      return res.status(200).json(data)

    } else if (req.method === 'PUT') {
      const { comment, userId } = req.body
      const { id }: any = req.query

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
    }
  } catch (e) {
    console.log('Error when adding comment: ', e)
    res.status(404).json(e)
  }
}
