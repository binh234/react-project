// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextApiHandler } from 'next/types'

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const user = req.body

//     try {
//       await client.createIfNotExists(user)
//       res.status(200).json('Login successfully')
//     } catch (e) {
//       console.log('Login failed: ', e)
//       res.status(400).json('Login failed')
//     }
//   }
// }

export function generateToken(payload: string | object | Buffer): string {
  return jwt.sign(payload, process.env.NEXT_PUBLIC_SECRET_KEY!, { expiresIn: '7d' })
}

export function verifyToken(token: string): any {
  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY!)
    return decoded
  } catch (err) {
    return null
  }
}

export function requireAuthentication(handler: NextApiHandler): NextApiHandler {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies['auth-token']
    if (!token) {
      res.status(401).send({ message: 'Authentication required' })
      return
    }
    const user = verifyToken(token)
    if (user) {
      req.user = user
      return handler(req, res)
    } else {
      res.status(401).send({ message: 'Authentication required' })
    }
  }
}
