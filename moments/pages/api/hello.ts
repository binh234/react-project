// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    res.send({
      version: "1.0",
      appName: "Moments",
      author: "Binh Le",
      message: 'Congratulations! You are now authenticated^^',
    })
  } else {
    res.send({
      message: 'You must be signed in to view the protected content on this page.',
    })
  }
}
