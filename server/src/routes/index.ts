import express from 'express';
import { registerRoute, loginRoute, logoutRoute, refreshRoute } from './auth';
import postRouter from './posts/postsRouter';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();

// auth routes
router.use('/', registerRoute);
router.use('/', loginRoute);
router.use('/', refreshRoute);
router.use('/', logoutRoute);

// routes added after this middleware requires authentication (access token)
router.use(authMiddleware);
router.use('/post', postRouter);

export default router;
