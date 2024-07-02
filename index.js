import express from 'express';
import { router } from './src/routes/index.js';
import pkg from './package.json' with { type: 'json' }; 
import { errorHandler, rateLimiter } from './src/middleware/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.set('pkg', pkg);
app.use(express.json());
app.use(rateLimiter);
app.use('/', router);
app.get('/', (req, res) =>
  res.json({
    app: 'Talent Manager 📴',
    name: pkg.name,
    version: pkg.version,
    contributors: pkg.contributors.map(person => person.name),
  })
);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
