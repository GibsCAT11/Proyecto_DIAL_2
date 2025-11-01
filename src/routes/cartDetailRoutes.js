import express from 'express';

const cartDetailRouter = express.Router();
import cartDetailController from '../controllers/cartDetailController.js'

cartDetailRouter.get('/cartDetail/', cartDetailController.getAll);
cartDetailRouter.get('/cartDetail/:id', cartDetailController.getById);
cartDetailRouter.post('/cartDetail/', cartDetailController.create);
cartDetailRouter.put('/cartDetail/:id', cartDetailController.update);
cartDetailRouter.delete('/cartDetail/:id', cartDetailController.delete);

export default cartDetailRouter;
