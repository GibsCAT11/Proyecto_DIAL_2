import express from 'express';

// Middlewares
import { errorHandler } from './src/middlewares/errorHandler.js';
import { verifyToken } from './src/middlewares/authentication.js';

// Rutas
import storeRouter from './src/routes/storeRoutes.js';
import cartRouter from './src/routes/cartRoutes.js';
import cartDetailRouter from './src/routes/cartDetailRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());

// Rutas JWT
app.use('/api/store', verifyToken, storeRouter);
app.use('/api/cart', verifyToken, cartRouter);
app.use('/api/cartDetail', verifyToken, cartDetailRouter);

app.use(errorHandler);

// Inicialización del servidor
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
