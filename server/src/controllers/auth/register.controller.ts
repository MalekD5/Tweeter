import bcrypt from 'bcrypt';
import crypto from 'crypto';
import type { Request, Response } from 'express';
import { checkDuplicate, create } from '@/models/userModel';
import { createVerifyCode } from '@/models/verifyModel';

export default async function registerController(req: Request, res: Response) {
  const { email, password, username } = req.body;

  const dupe = await checkDuplicate(email, username);
  if (dupe)
    return res.status(409).json({
      message: `${
        dupe.username === username
          ? 'username already exists!'
          : 'email already exists!'
      }`
    });

  try {
    const encrypted_password = await bcrypt.hash(password, 10);
    const id = await create(username, email, encrypted_password);

    res.status(201).json({ message: 'Created' });
    await createVerifyCode(
      id,
      email,
      crypto.randomUUID().replace(/-/g, '').substring(0, 12)
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: (err as Error).message });
  }
}
