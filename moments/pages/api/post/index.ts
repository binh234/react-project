// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
// import { requireAuthentication } from '../auth/index'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const query = allPostsQuery()

      const data = await client.fetch(query)
      res.status(200).json(data)
    } else if (req.method === 'POST') {
      const session = await getServerSession(req, res, authOptions)
      if (session) {
        const { user } = session
        const document = req.body
        document.postedBy = {
          _type: 'postedBy',
          _ref: user._id,
        }
        await client.create(document)
        res.status(200).json('Video created')
      } else {
        res.status(401).send({ message: 'Authentication required' })
      }
    }
  } catch (error: any) {
    res.status(404).json(error)
  }
}
