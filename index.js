<<<<<<< HEAD
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
=======
import express from 'express';
>>>>>>> 9bc858f (Creating a server with Express, controllers, and routes)
const app = express();

// Rutas
import routeIndex from './routes/routeIndex.js';
import routeUser from './routes/routeUser.js';

// Middleware para parsear JSON
app.use(express.json());
// Usar las rutas
app.use('/', routeIndex);
app.use('/users', routeUser);

/* Puerto que se le puede asignar en el ambiente donde está publicada en vivo
   Si no está especificado toma el puerto 3000*/
   const PORT = process.env.PORT || 3000;

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
<<<<<<< HEAD
});
>>>>>>> 8622c44 (Cambios endpoint express)
=======
} );
>>>>>>> 9bc858f (Creating a server with Express, controllers, and routes)
