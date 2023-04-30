import { getCommentsV2 } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function GetCommentsController(
  req: Request,
  res: Response
) {
  const tweetId = req.params.id;
  const userId = req.locals.id;

  try {
    const comments = await getCommentsV2(tweetId, userId);
    return res.status(200).json(comments);
  } catch (err: any) {
    res.sendStatus(500);
    console.error(err);
  }
}
