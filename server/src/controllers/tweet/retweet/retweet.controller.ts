import { addRetweet } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function ReTweetController(req: Request, res: Response) {
  const { tweet_id } = req.body;
  const id = req.locals.id;

  try {
    await addRetweet(id, tweet_id);
    res.status(201).json('OK');
  } catch (err: any) {
    res.sendStatus(500);
    console.error(err);
  }
}
