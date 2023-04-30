import { Request, Response } from 'express';
import { retrieveTopTweets } from '@/models/tweetModel';

export default async function latestTweetsController(
  req: Request,
  res: Response
) {
  const userId = req.locals.id;
  try {
    const tweets = await retrieveTopTweets(userId);

    res.status(200).json(tweets);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: (err as Error).message });
  }
}
