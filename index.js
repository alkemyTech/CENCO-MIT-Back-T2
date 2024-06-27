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