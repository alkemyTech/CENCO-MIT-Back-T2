import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

export const UserRouter = Router();

//Definition routes using controller methods
UserRouter.get('/', UserController.getUser);
UserRouter.get('/:id', UserController.getById);
UserRouter.post('/', UserController.createUser);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);

export default UserRouter;
