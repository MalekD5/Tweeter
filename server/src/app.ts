import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import options from './config/defaultOptions';
import rootRouter from './routes';
import { config } from 'dotenv';
import { credentialMiddleware } from './middleware/credentialMiddleware';
import { connect } from './MySQLConnection';
import './Nodemailer';

// load .env file
config();
const PORT: number = process.env.PORT || 5000;
const app = express();

app.use(helmet());
const LIMIT = '15mb';

app.use(bodyParser.json({ limit: LIMIT }));
app.use(bodyParser.urlencoded({ limit: LIMIT, extended: true }));
app.use(credentialMiddleware);
app.use(cors(options.cors));
app.use(cookieParser());
app.use('/api/v1', rootRouter);

connect().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
