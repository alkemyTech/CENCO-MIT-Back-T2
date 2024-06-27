<<<<<<< HEAD
import express from 'express';
import { router } from './src/routes/index.js';

const app = express();

// Middleware to parse JSON 
app.use(express.json());

// Use router
app.use('/', router);

// Takes port from .env or defaults to 3000
const port = process.env.PORT || 3000;

// Initialize server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
} );
=======
import {express} from 'express'  ;
const app = express();

//Puerto que se le puede asignar en el ambiente donde esta publicada en vivo, si no esta especificada toma el 3000
const PORT =  process.env.PORT || 3000;

// Middleware for parsear 
app.use(express.json());

// Endpoint GET Raiz
app.get('/', (req, res) => {
  res.send('Hola, cenco!');
});




// Sever
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
>>>>>>> 8622c44 (Cambios endpoint express)
