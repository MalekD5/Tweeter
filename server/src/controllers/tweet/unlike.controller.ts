import { removeLike } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function UnLikeController(req: Request, res: Response) {
  const tweet_id = req.query.id;
  const user_id = req.locals.id;

  try {
    await removeLike(user_id, tweet_id as string);
    res.status(200).json({ message: 'ok' });
  } catch (err: any) {
    res.sendStatus(500);
    throw err;
  }
}
