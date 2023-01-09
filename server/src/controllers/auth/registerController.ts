import { Request, Response } from 'express';
import { checkDuplicate, create } from '../../models/userModel';
import bcrypt from 'bcrypt';

export const registerController = async (req: Request, res: Response) => {
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
    await create(username, email, encrypted_password);

    return res.status(201).json({ message: 'Created' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: (err as Error).message });
  }
};
