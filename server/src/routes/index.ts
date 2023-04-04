import express from 'express';
import { registerRoute, loginRoute, logoutRoute, refreshRoute } from './auth';
import postRouter from './tweets/tweets.route';
import { authMiddleware } from '@/middleware/authMiddleware';
import uploadRouter from './upload/upload.route';
import bookmarkRoute from './bookmark/bookmark.route';
const router = express.Router();

// auth routes
router.use('/', registerRoute);
router.use('/', loginRoute);
router.use('/', refreshRoute);
router.use('/', logoutRoute);

// routes added after this middleware requires authentication (access token)
router.use(authMiddleware);
router.use('/tweet', postRouter);
router.use(uploadRouter);
router.use('/bookmarks', bookmarkRoute);

export default router;
