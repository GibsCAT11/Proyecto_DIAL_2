import express from 'express';
import storeRouter from './src/routes/storeRoutes.js';
import productRouter from './src/routes/productRoutes.js';
import clientRouter from './src/routes/clientRoutes.js';
import autRouter from './src/routes/authRoutes.js';

import {errorHandler} from './src/middlewares/errorHandler.js';
import { verifyToken } from './src/middlewares/authentication.js';

const app = express();

app.use(express.json());

app.use('/api', autRouter);
app.use('/api', verifyToken, clientRouter);
app.use('/api', verifyToken, storeRouter);
app.use('/api', verifyToken, productRouter);

const port = 3000;

app.use(errorHandler);

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`)
})