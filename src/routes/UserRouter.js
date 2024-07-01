import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { isAdmin, isAuthenticated } from '../middleware/index.js';


export const UserRouter = Router();

UserRouter.get('/', isAuthenticated, isAdmin, UserController.getAllUsers);
UserRouter.get('/info', isAuthenticated, UserController.getUserInfo); 
UserRouter.get('/:id', UserController.getById);
UserRouter.post('/', UserController.createUser);
UserRouter.get('/:id', UserController.getById);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);