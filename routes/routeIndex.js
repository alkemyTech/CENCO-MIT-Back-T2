import express from 'express';
 export const ROUTER = express.Router();

// Import controller
import { getIndex, postIndex, putIndex, delIndex } from '../controllers/indexController.js';


// Define the routes using the controller methods
ROUTER.get('/', getIndex);
ROUTER.post('/', postIndex);
ROUTER.put('/', putIndex);
ROUTER.delete('/:id', delIndex);

export default ROUTER;