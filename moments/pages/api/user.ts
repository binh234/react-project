// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {client} from '@/utils/client'
import {allUsersQuery} from '@/utils/queries'
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await client.fetch(allUsersQuery())
      res.status(200).json(data)
    } catch (e) {
      console.log('Error: ', e)
      res.status(404).json(e)
    }
  }
}
