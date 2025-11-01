import { Router } from "express";
import * as orderDetailController from '../controllers/orderDetailController.js';

const orderDetailRouter = Router({ mergeParams: true });

orderDetailRouter.get('/', orderDetailController.getOrderDetails);
orderDetailRouter.post('/', orderDetailController.addOrderItem);

export default orderDetailRouter;