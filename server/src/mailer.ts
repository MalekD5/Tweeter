import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();

export const initialize = () => {
  const transport = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_USER,
      pass: process.env.SMPT_PASSWORD
    }
  });
  return { transport };
};

export const { transport } = initialize();
