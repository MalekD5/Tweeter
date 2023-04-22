import { Request, Response } from 'express';
import { type Tweet, createTweet } from '@/models/tweetModel';
import { transformData } from '@/utils/ModelUtils';

export default async function createPostController(
  req: Request,
  res: Response
) {
  const { text } = req.body;
  const userid = req.locals.id;

  try {
    const id = await createTweet(userid, text);
    const tweet: Tweet = {
      author: userid,
      content: text,
      comments: 0,
      likes: 0,
      retweets: 0,
      id,
      created_at: new Date().toISOString(),
      pfp: req.locals.pfp,
      constructor: {
        name: 'RowDataPacket'
      }
    };

    const data = transformData(userid, [tweet], [], []);
    res.status(201).json(data[0]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ errors: (err as Error).message });
  }
}
