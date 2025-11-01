import { Router } from "express";
import * as NotificationController from '../controllers/notificationController.js';

const notificationRouter = Router();


notificationRouter.post('/notification', NotificationController.create);


notificationRouter.get('/order/:orderId', NotificationController.getByOrderId);


notificationRouter.get('/client/:clientId', NotificationController.getByClientId);


export default notificationRouter;