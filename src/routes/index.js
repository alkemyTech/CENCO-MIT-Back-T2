import { Router } from 'express';
import { UserRouter } from './UserRouter.js';

export const router = Router();

router.use('/users', UserRouter);

