import express from 'express';
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
} );