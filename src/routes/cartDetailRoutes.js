import express from 'express';

const cartDetailRouter = express.Router();
import cartDetailController from '../controllers/cartDetailController.js'

cartDetailRouter.get('/', cartDetailController.getAll);
cartDetailRouter.get('/:id', cartDetailController.getById);
cartDetailRouter.post('/', cartDetailController.create);
cartDetailRouter.put('/:id', cartDetailController.update);
cartDetailRouter.delete('/:id', cartDetailController.delete);

export default cartDetailRouter;
