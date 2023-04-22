import express from 'express';
import { config } from 'dotenv';
import { body } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import { registerController } from '@/controllers/auth';

config();

const router = express.Router();
router.post(
  '/register',
  [
    body(['displayname', 'username'])
      .trim()
      .isAlphanumeric()
      .withMessage('invalid username or displayname'),
    body('email').isEmail(),
    process.env.NODE_ENV === 'development'
      ? body('password')
      : body('password').isStrongPassword()
  ],
  validationMiddleware,
  registerController
);

export default router;
