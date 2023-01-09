import { Request, Response, NextFunction } from 'express';
import { allowedOrigins } from '../config/defaultOptions';

export const credentialMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin!) !== -1)
    res.header('Access-Control-Allow-Credentials', 'true');

  next();
};
