import { Router } from "express";
import * as OrderDetailController from '../src/controllers/OrderDetailController.js';

const orderDetailRouter = Router({ mergeParams: true });

orderDetailRouter.get('/', OrderDetailController.getOrderDetails);
orderDetailRouter.post('/', OrderDetailController.addOrderItem);

export default orderDetailRouter;