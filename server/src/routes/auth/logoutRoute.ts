import express from 'express';
import { logoutController } from '../../controllers/auth/logoutController';
import { cookie } from 'express-validator';
import { validationMiddleware } from '../../middleware/validationMiddleware';

const router = express.Router();

router.get(
  '/logout',
  cookie('jwt').exists().withMessage('invalid cookie'),
  validationMiddleware,
  logoutController
);

export default router;
