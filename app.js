import express from 'express';
import storeRouter from './src/routes/storeRoutes.js';
import {errorHandler} from './src/middlewares/errorHandler.js';
import { verifyToken } from './src/middlewares/authentication.js';

const app = express();

app.use(express.json());

app.use('/api', verifyToken, storeRouter);

const port = 3000;

app.use(errorHandler);

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`)
})