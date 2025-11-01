import { Router } from "express";
import * as orderController from '../controllers/orderController.js';
import orderDetailRouter from './orderDetailRoutes.js';

const orderRouter = Router();

orderRouter.get('/', orderController.getAllOrders);
orderRouter.post('/', orderController.createOrder);
orderRouter.get('/:id', orderController.getOrderById);
orderRouter.put('/:id', orderController.updateOrder);
orderRouter.patch('/:id/status', orderController.updateOrderStatus);

orderRouter.use('/:orderId/details', orderDetailRouter);

export default orderRouter;