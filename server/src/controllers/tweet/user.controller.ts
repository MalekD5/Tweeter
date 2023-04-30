import { getUserTweets } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function UserTweetController(req: Request, res: Response) {
  const user_id = req.locals.id;

  try {
    const tweets = await getUserTweets(user_id);

    res.status(200).json(tweets);
  } catch (err: any) {
    console.error(err);
    res.sendStatus(500);
  }
}
