// src/routes/cartRoutes.js
import express from 'express';
const cartRouter = express.Router();
import cartController from '../controllers/cartController.js'

cartRouter.get('/', cartController.getAll);
cartRouter.get('/:id', cartController.getById);
cartRouter.post('/', cartController.create);
cartRouter.put('/:id', cartController.update);
cartRouter.delete('/:id', cartController.delete);

export default cartRouter;
