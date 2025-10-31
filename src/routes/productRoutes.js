import {Router} from "express";
import * as ProductController from '../controllers/productController.js'

const productRouter = Router();

productRouter.get('/product/', ProductController.getAll);
productRouter.get('/product/:id', ProductController.getById);
productRouter.post('/product/', ProductController.create);
productRouter.put('/product/:id', ProductController.update);
productRouter.delete('/product/:id', ProductController.deleted);

export default productRouter;