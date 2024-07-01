import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { isAdmin } from '../../middlewares/AuthMiddleware.js';
import { authenticateToken } from '../middleware/auth.js';

export const UserRouter = Router();

UserRouter.get('/', authenticateToken, isAdmin, UserController.getUsers);
UserRouter.get('/user', authenticateToken, UserController.getUserInfo);
UserRouter.get('/:id', UserController.getById);
UserRouter.post('/', UserController.createUser);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);

