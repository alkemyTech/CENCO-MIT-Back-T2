import express from 'express';
export const routeUser = express.Router();

// Import Controller
import { getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';

//Definition routes using controller methods
routeUser.get('/', getUser);
routeUser.post('/', createUser);
routeUser.put('/:id', updateUser);
routeUser.delete('/:id', deleteUser);

export default routeUser;
