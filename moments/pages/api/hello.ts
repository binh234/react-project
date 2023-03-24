// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    res.send({
      message: 'This is protected content. You can access this content because you are signed in.',
    })
  } else {
    res.send({
      message: 'You must be signed in to view the protected content on this page.',
    })
  }
}
