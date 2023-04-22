import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import options from './config/defaultOptions';
import rootRouter from './routes';
import { config } from 'dotenv';
import { credentialMiddleware } from './middleware/credentialMiddleware';
import { connect } from './mysql';
import rateLimit from 'express-rate-limit';

// load .env file
config();
const PORT: number = process.env.PORT || 5000;
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});

const app = express();

app.use(helmet());
app.use(limiter);
const SIZE_LIMIT_MB = '1mb';

app.use(bodyParser.json({ limit: SIZE_LIMIT_MB }));
app.use(credentialMiddleware);
app.use(cors(options.cors));
app.use(cookieParser());
app.use('/images', express.static('images'));
app.use('/api/v1', rootRouter);

connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
