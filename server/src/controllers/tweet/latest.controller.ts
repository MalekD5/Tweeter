import { Request, Response } from 'express';
import { retrieveTopTweets, getLikes, getRetweets } from '@/models/tweetModel';
import { getBookmarksId } from '@/models/bookmarkModel';
import { transformData } from '@/utils/ModelUtils';

export default async function latestTweetsController(
  req: Request,
  res: Response
) {
  const user_id = req.locals.id;
  try {
    const tweets = await retrieveTopTweets();
    const bookmarks = await getBookmarksId(user_id);
    const likes = await getLikes(user_id);
    const retweets = await getRetweets(user_id);

    const data = transformData(user_id, tweets, bookmarks, likes, retweets);

    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: (err as Error).message });
  }
}
