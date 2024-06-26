
import express from 'express';
export const ROUTER = express.Router();

// Importar el controlador
import { getIndex, postIndex, putIndex, delIndex } from '../controllers/indexController.js';


// Definir las rutas utilizando los métodos del controlador
ROUTER.get('/', getIndex);
ROUTER.post('/', postIndex);
ROUTER.put('/', putIndex);
ROUTER.delete('/:id', delIndex);

export default ROUTER;