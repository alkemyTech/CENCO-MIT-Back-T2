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
