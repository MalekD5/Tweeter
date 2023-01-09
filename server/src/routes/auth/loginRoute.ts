import express from 'express';
import { body } from 'express-validator';
import { loginController } from '../../controllers/auth/loginController';
import { validationMiddleware } from '../../middleware/validationMiddleware';

const router = express.Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').not().isEmpty()],
  validationMiddleware,
  loginController
);

export default router;
