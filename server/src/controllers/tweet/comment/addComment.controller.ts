import { addComment } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function AddCommentController(
  req: Request,
  res: Response
) {
  const { replying_to, comment } = req.body;
  const id = req.locals.id;

  try {
    await addComment(replying_to, id, comment);
    res.status(201).json('OK');
  } catch (err: any) {
    res.sendStatus(500);
    console.error(err);
  }
}
