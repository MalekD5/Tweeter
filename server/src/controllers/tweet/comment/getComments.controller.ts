import { getComments } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function GetCommentsController(
  req: Request,
  res: Response
) {
  const id = req.params.id;

  try {
    const comments = await getComments(id);
    return res.status(200).json(comments);
  } catch (err: any) {
    res.sendStatus(500);
    console.error(err);
  }
}
