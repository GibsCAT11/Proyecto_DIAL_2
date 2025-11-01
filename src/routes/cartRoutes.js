// src/routes/cartRoutes.js
import express from 'express';
const cartRouter = express.Router();
import cartController from '../controllers/cartController.js'

cartRouter.get('/cart/', cartController.getAll);
cartRouter.get('/cart/:id', cartController.getById);
cartRouter.post('/cart/', cartController.create);
cartRouter.put('/cart/:id', cartController.update);
cartRouter.delete('/cart/:id', cartController.delete);

export default cartRouter;
