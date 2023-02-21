import express from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import { loginController } from '@/controllers/auth';

const router = express.Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').not().isEmpty()],
  validationMiddleware,
  loginController
);

export default router;
