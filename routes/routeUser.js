import express from 'express';
const ROUTER = express.Router();

// Import Controller
import { getUser, createUser, updateUser, deleteUser } from '../controllers/userController.js';

//Definition routes using controller methods
ROUTER.get('/:id', getUser);
ROUTER.post('/', createUser);
ROUTER.put('/:id', updateUser);
ROUTER.delete('/:id', deleteUser);

export default ROUTER;
