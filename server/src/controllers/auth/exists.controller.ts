import type { Request, Response } from 'express';
import { find } from '@/models/authModel';

export default async function ExistsController(req: Request, res: Response) {
  const email = req.query.email;

  try {
    const result = await find(email as string);
    if (result) {
      return res.sendStatus(409);
    }
    res.status(200).json({ message: 'OK' });
  } catch (err: any) {
    res.sendStatus(500);
    throw err;
  }
}
