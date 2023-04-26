import { getBookmarksId } from '@/models/bookmarkModel';
import { getLikes, getRetweets, getUserTweets } from '@/models/tweetModel';
import { transformData, transformDataForUser } from '@/utils/ModelUtils';
import type { Request, Response } from 'express';

export default async function UserTweetController(req: Request, res: Response) {
  const user_id = req.locals.id;

  try {
    const tweets = await getUserTweets(user_id);
    const likes = await getLikes(user_id);
    const bookmarks = await getBookmarksId(user_id);
    const retweets = await getRetweets(user_id);

    const data = transformDataForUser(
      user_id,
      tweets,
      bookmarks,
      likes,
      retweets
    );
    res.status(200).json(data);
  } catch (err: any) {
    console.error(err);
    res.sendStatus(500);
  }
}
