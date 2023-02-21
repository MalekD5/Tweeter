import { Request, Response } from 'express';
import type { Tweet } from '../../models/tweetModel';
import { retrieveTopTweets } from '../../models/tweetModel';

export default async function latestPostsController(
  req: Request,
  res: Response
) {
  try {
    const tweet: Tweet[] = await retrieveTopTweets();
    res.status(200).json({ tweet });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
}
