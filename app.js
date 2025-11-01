import express from 'express';

// Rutas
import storeRouter from './src/routes/storeRoutes.js';
import productRouter from './src/routes/productRoutes.js';
import clientRouter from './src/routes/clientRoutes.js';
import autRouter from './src/routes/authRoutes.js';
import cartRouter from './src/routes/cartRoutes.js';
import cartDetailRouter from './src/routes/cartDetailRoutes.js';

// Middlewares
import { errorHandler } from './src/middlewares/errorHandler.js';
import { verifyToken } from './src/middlewares/authentication.js';



const app = express();
const port = 3000;

app.use(express.json());

// Rutas JWT
app.use('/api', autRouter);
app.use('/api', verifyToken, clientRouter);
app.use('/api', verifyToken, storeRouter);
app.use('/api', verifyToken, productRouter);
app.use('/api/cart', verifyToken, cartRouter);
app.use('/api/cartDetail', verifyToken, cartDetailRouter);

app.use(errorHandler);

// Inicialización del servidor
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
