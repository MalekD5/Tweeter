import { Request, Response } from 'express';
import { retrieveTopTweets } from '@/models/tweetModel';

export default async function latestPostsController(
  _req: Request,
  res: Response
) {
  try {
    const tweet = await retrieveTopTweets();
    res.status(200).json(tweet);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: (err as Error).message });
  }
}
