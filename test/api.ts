import { NextApiRequest, NextApiResponse } from 'next'
import { json } from '../src/api'

const handler = json(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return {}
  }
  if (req.method === 'POST') {
    return null
  }
})
