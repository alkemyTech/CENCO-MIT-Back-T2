import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { isAdmin } from '../../middlewares/AuthMiddleware.js';
import { authenticateToken } from '../middleware/auth.js';

export const UserRouter = Router();
UserRouter.get('/info', authenticateToken, UserController.getUserInfo); // Ruta protegida por el middleware de autenticación
UserRouter.get('/', authenticateToken, isAdmin, UserController.getUsers);
UserRouter.get('/:id', UserController.getById);
UserRouter.post('/', UserController.createUser);
UserRouter.get('/:id', UserController.getById);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);
