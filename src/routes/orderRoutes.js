import { Router } from "express";
import * as OrderController from '../src/controllers/OrderController.js';

import orderDetailRouter from './orderDetailRoutes.js';

const orderRouter = Router();

orderRouter.get('/', OrderController.getAllOrders);
orderRouter.post('/', OrderController.createOrder);
orderRouter.get('/:id', OrderController.getOrderById);
orderRouter.put('/:id', OrderController.updateOrder);
orderRouter.patch('/:id/status', OrderController.updateOrderStatus);

orderRouter.use('/:orderId/details', orderDetailRouter);

export default orderRouter;