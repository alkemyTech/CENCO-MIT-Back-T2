import { Router } from 'express';
import { AuthController } from '../controllers/index.js';

export const AuthRouter = Router();

AuthRouter.post('/signup', AuthController.signup);