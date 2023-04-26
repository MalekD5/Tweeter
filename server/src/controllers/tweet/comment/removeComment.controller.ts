import { removeComment } from '@/models/tweetModel';
import type { Request, Response } from 'express';

export default async function RemoveCommentController(
  req: Request,
  res: Response
) {
  const comment_id = req.query.comment_id as string;
  const id = req.locals.id;

  try {
    const result = await removeComment(comment_id, id);
    if (result?.error) {
      res.status(401).json(result.error);
      return;
    }
    res.status(201).json('OK');
  } catch (err: any) {
    res.sendStatus(500);
    console.error(err);
  }
}
