// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '@/utils/client'
import {postDetailQuery} from '@/utils/queries'
import type {NextApiRequest, NextApiResponse} from 'next'
import {v4 as uuidv4} from 'uuid'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {id} = req.query
    const query = postDetailQuery(id!)

    try {
      const data = await client.fetch(query)
      res.status(200).json(data[0])
    } catch (e) {
      console.log('Error when retrieve post data: ', e)
      res.status(404).json(e)
    }
  } else if (req.method === "PUT") {
    const { comment, userId } = req.body;
    const {id}: any = req.query;

    try {
      const data = await client
          .patch(id)
          .setIfMissing({comments: []})
          .insert('after', 'comments[-1]', [
            { 
              comment: comment,
              _key: uuidv4(),
              postedBy: {
                _type: 'postedBy',
                _ref: userId
              }
            },
          ])
          .commit()
      res.status(200).json(data);
    } catch (e) {
      console.log('Error when adding comment: ', e)
      res.status(404).json(e)
    }
  }
}
