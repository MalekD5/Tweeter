import type { Request, Response } from 'express';
import { createTokens, jwtCookieOptions } from '@/utils/JWTUtils';
import { findByEmail } from '@/models/userModel';
import bcrypt from 'bcrypt';

export default async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await findByEmail(email);
  if (!user) return res.sendStatus(401);
  if (user.verified !== '1') return res.sendStatus(403);

  const check = await bcrypt.compare(password, user.password);
  if (check) {
    const [accessToken, refreshToken] = createTokens(user);

    // set refresh token and save
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('jwt', refreshToken, jwtCookieOptions);
    return res.status(200).json({ token: accessToken });
  }
  res.sendStatus(401);
}
