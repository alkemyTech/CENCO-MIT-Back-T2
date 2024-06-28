import { Router } from 'express';
import { UserRouter } from './UserRouter.js';
import { AuthRouter } from './AuthRouter.js';

export const router = Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);