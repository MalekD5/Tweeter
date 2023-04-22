import { deleteTweet } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function DeleteTweetController(
  req: Request,
  res: Response
) {
  const id = req.locals.id;
  const tweet_id = req.query.id as string;
  try {
    const result = await deleteTweet(id, tweet_id);
    if (!result) {
      return res.sendStatus(401);
    }
    res.sendStatus(200);
  } catch (err: any) {
    res.sendStatus(500);
    throw err;
  }
}
