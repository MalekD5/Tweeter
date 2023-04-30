import { Request, Response } from 'express';
import { createTweet } from '@/models/tweetModel';

export default async function createPostController(
  req: Request,
  res: Response
) {
  const { text } = req.body;
  const userid = req.locals.id;

  try {
    await createTweet(userid, text);
    res.status(201).json('OK');
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ errors: (err as Error).message });
  }
}
