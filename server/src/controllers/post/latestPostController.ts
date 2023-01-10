import { Request, Response } from 'express';
import type { Post } from '../../models/postModel';
import { retrieveTopPosts } from '../../models/postModel';

export async function latestPostsController(req: Request, res: Response) {
  try {
    const post: Post[] = await retrieveTopPosts();
    res.status(200).json({ post });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
}
