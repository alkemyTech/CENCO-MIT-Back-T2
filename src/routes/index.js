import { Router } from 'express';
import { UserRouter } from './UserRouter.js';
import { AuthRouter } from './AuthRouter.js';

export const router = Router();

router.use('/auth', AuthRouter); // auth endpoints
router.use('/users', UserRouter); // all user req endpoints
