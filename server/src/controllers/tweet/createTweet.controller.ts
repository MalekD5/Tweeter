import { Request, Response } from 'express';
import { createTweet } from '../../models/tweetModel';

export async function createPostController(req: Request, res: Response) {
  const { text } = req.body;
  const userid = req.locals.userid;

  try {
    const postId = await createTweet(userid, text);
    res.status(201).json({ postId });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ errors: (err as Error).message });
  }
}
