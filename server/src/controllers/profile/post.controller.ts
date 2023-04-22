import { updateInfo } from '@/models/userModel';
import type { Request, Response } from 'express';

export default async function ProfileController(req: Request, res: Response) {
  const { username, displayname, bio } = req.body;
  const id = req.locals.id;
  try {
    await updateInfo(id, username, displayname, bio);
    res.sendStatus(200);
  } catch (err: any) {
    res.sendStatus(500);
    throw err;
  }
}
