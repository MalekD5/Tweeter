import express from 'express';
import { cookie } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import { refreshController } from '@/controllers/auth';

const router = express.Router();

router.get(
  '/refresh',
  cookie('jwt').exists().withMessage('jwt cookie is required'),
  validationMiddleware,
  refreshController
);

export default router;
