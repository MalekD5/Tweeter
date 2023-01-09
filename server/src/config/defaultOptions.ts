import { CorsOptions } from 'cors';

type StaticOrigin = boolean | string | RegExp | (boolean | string | RegExp)[];

export const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5173'
];

export default {
  limit: '15mb',
  cors: {
    origin: (
      origin: string,
      callback: (err: Error | null, origin?: StaticOrigin) => void
    ) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
  } as CorsOptions
};
