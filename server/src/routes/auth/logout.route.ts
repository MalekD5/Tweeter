import express from 'express';
import { cookie } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import { logoutController } from '@/controllers/auth';

const router = express.Router();

router.get(
  '/logout',
  cookie('jwt').exists().withMessage('invalid cookie'),
  validationMiddleware,
  logoutController
);

export default router;
