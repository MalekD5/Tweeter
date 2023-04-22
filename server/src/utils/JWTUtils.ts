import { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_EXPIRY = '1d';
const ACCESS_TOKEN_EXPIRY = '1h';

export function createAccessToken(id: number) {
  return jwt.sign(
    {
      id
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

export function createRefreshToken(id: number) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY
  });
}

export function createTokens(id: number) {
  return [createAccessToken(id), createRefreshToken(id)];
}

export const jwtCookieOptions: CookieOptions = {
  httpOnly: true, // prevent browser javascript from accessing the cookie
  //secure: true, // this forces the cookie to be sent over https only, remove in development
  sameSite: 'none',
  maxAge: 24 * 60 * 60 * 1000 // 1 day
};

export const jwtClearCookieOptions = {
  httpOnly: jwtCookieOptions.httpOnly,
  sameSite: jwtCookieOptions.sameSite
  //secure: jwtCookieOptions.secure,
};
