// src/routes/paymentRoutes.js
import express from 'express';
import PaymentController from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/payments', PaymentController.recordPayment);
paymentRouter.get('/payments/order/:orderId', PaymentController.getPaymentByOrderId);
paymentRouter.get('/payments', PaymentController.getAllPayments);

export default paymentRouter;