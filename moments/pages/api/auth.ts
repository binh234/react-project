// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = req.body;

    try {
        await client.createIfNotExists(user);
        res.status(200).json('Login successfully');
    }
    catch (e) {
        console.log("Login failed: ", e);
        res.status(404).json('Login failed');
    }
  }
}
