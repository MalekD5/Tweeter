import { Request, Response } from 'express';
import { editTweet, isOwnerOfTweet } from '../../models/tweetModel';

export default async function editTweetController(req: Request, res: Response) {
  const { text, tweetId } = req.body;
  const userid = req.locals.userid;
  try {
    const isOwner = await isOwnerOfTweet(tweetId, userid);
    if (!isOwner) return res.sendStatus(403);

    await editTweet(tweetId, text);
    res.sendStatus(200);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ errors: (err as Error).message });
  }
}
