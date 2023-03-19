import express from 'express';
import {
  registerRoute,
  loginRoute,
  logoutRoute,
  refreshRoute,
  verifyRoute
} from './auth';
import postRouter from './tweets/tweets.route';
import { authMiddleware } from '@/middleware/authMiddleware';
import uploadRouter from './upload/upload.route';

const router = express.Router();

// auth routes
router.use('/', registerRoute);
router.use('/', loginRoute);
router.use('/', refreshRoute);
router.use('/', logoutRoute);
router.use('/', verifyRoute);

// routes added after this middleware requires authentication (access token)
router.use(authMiddleware);
router.use('/tweet', postRouter);
router.use(uploadRouter);

export default router;
