import { Request, Response } from 'express';
import { createPost } from '../../models/postModel';

export async function createPostController(req: Request, res: Response) {
  const { text } = req.body;
  const userid = req.locals.userid;

  try {
    const postId = await createPost(userid, text);
    res.status(201).json({ postId });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ errors: (err as Error).message });
  }
}
