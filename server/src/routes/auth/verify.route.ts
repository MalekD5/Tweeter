import express from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import { verifyController } from '@/controllers/auth';

const router = express.Router();

router.post('/verify', [
  body('verifyCode').trim().escape().isLength({ min: 12, max: 12 }),
  validationMiddleware,
  verifyController
]);

export default router;
