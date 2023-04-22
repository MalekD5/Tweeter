import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { createUser, setRefreshToken } from '@/models/authModel';
import { createTokens, jwtCookieOptions } from '@/utils/JWTUtils';

export default async function registerController(req: Request, res: Response) {
  const { email, password, username, displayname } = req.body;
  try {
    const encrypted_password = await bcrypt.hash(password, 10);
    const id = await createUser(
      email,
      encrypted_password,
      username,
      displayname
    );
    const [accessToken, refreshToken] = createTokens(id);

    // set refresh token and save
    await setRefreshToken(id, refreshToken);

    res.cookie('jwt', refreshToken, jwtCookieOptions);
    return res.status(201).json({
      token: accessToken
    });
  } catch (err: any) {
    console.log(err);
    res.sendStatus(409);
  }
}
