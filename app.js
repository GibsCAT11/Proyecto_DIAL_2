import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Rutas
import storeRouter from './src/routes/storeRoutes.js';
import productRouter from './src/routes/productRoutes.js';
import clientRouter from './src/routes/clientRoutes.js';
import autRouter from './src/routes/authRoutes.js';
import cartRouter from './src/routes/cartRoutes.js';
import cartDetailRouter from './src/routes/cartDetailRoutes.js';
import orderRouter from './src/routes/orderRoutes.js';
import notificationRouter from './src/routes/notificationRoute.js';
import paymentRouter from './src/routes/paymentRouter.js';

// Middlewares
import { errorHandler } from './src/middlewares/errorHandler.js';
import { verifyToken } from './src/middlewares/authentication.js';



const app = express();
const port = 3000;

app.use(cookieParser())
app.use(cors({
  origin:"http://192.168.100.14:4000",
  credentials:true
}));
app.use(express.json());

// Rutas JWT
app.use('/api/v1', autRouter);
app.use('/api/v1', storeRouter);
app.use('/api/v1', verifyToken, clientRouter);
app.use('/api/v1', verifyToken, productRouter);
app.use('/api/v1', verifyToken, cartRouter);
app.use('/api/v1', verifyToken, cartDetailRouter);
app.use('/api/v1', verifyToken, orderRouter);
app.use('/api/v1', verifyToken, notificationRouter);
app.use('/api/v1', verifyToken, paymentRouter);


app.use(errorHandler);

// Inicialización del servidor
app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});
