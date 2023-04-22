import { Request, Response } from 'express';
import { retrieveTopTweets, getLikes, Tweet } from '@/models/tweetModel';
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

    const data = transformData(user_id, tweets, bookmarks, likes);

    res.status(200).json(data);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: (err as Error).message });
  }
}
