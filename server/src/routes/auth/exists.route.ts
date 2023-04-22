import ExistsController from '@/controllers/auth/exists.controller';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import express from 'express';
import { query } from 'express-validator';

const router = express.Router();

router.get(
  '/find',
  [query('email').isEmail().withMessage('invalid field email')],
  validationMiddleware,
  ExistsController
);

export default router;
