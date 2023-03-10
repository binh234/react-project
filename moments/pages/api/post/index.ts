// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client';
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const query = allPostsQuery();

    const data = await client.fetch(query);
    res.status(200).json(data);
  }
}
