import { getTweet } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function TweetIdController(req: Request, res: Response) {
  const tweet_id = req.params.id;
  const user_id = req.locals.id;

  try {
    const tweet = await getTweet(tweet_id, user_id);
    res.status(200).json(tweet);
  } catch (err: any) {
    res.sendStatus(500);
    console.error(err);
  }
}
