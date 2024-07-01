import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { isAdmin } from '../../middlewares/AuthMiddleware.js';

export const UserRouter = Router();

UserRouter.get('/', isAdmin, UserController.getUsers);
UserRouter.get('/:id', UserController.getById);
UserRouter.post('/', UserController.createUser);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);