import express from 'express';
import { router } from './src/routes/index.js';
import pkg from './package.json' with { type: 'json' };

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.set('pkg', pkg);

// Middleware to parse JSON
app.use(express.json());

app.use('/', router);

app.get('/', (req, res) =>
  res.json({
    app: 'Gestión de Usuarios 📴',
    name: pkg.name,
    version: pkg.version,
    contributors: pkg.contributors.map((person) => person.name),
  })
);

// Initialize server
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
