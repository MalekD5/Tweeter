import { addLike } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function LikeController(req: Request, res: Response) {
  const { tweet_id } = req.body;
  const user_id = req.locals.id;

  try {
    await addLike(user_id, tweet_id);
    res.status(200).json({ message: 'ok' });
  } catch (err: any) {
    res.sendStatus(500);
    throw err;
  }
}
