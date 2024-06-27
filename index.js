import express from 'express';
const app = express();

// Routes
import routeIndex from './routes/routeIndex.js';
import routeUser from './routes/routeUser.js';

// Middleware to parse JSON 
app.use(express.json());
// Usar las rutas
app.use('/', routeIndex);
app.use('/users', routeUser);

/* Port that can be assigned in the live environment
   If not specified, it defaults to port 3000 */
   const PORT = process.env.PORT || 3000;

// Initialize server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
} );