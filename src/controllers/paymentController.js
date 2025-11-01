import PaymentDAO from '../daos/PaymentDAO';

class PaymentController {
    
    static async recordPayment(req, res) {
        const paymentData = req.body;

        if (!paymentData.amount || !paymentData.payment_method || !paymentData.order_id) {
            return res.status(400).json({ error: 'Missing required payment fields: amount, payment_method, order_id' });
        }

        try {
            await PaymentDAO.recordPayment(paymentData);
            return res.status(201).json({ message: 'Payment recorded successfully' });
        } catch (error) {
            console.error('Error recording payment:', error.message);
            return res.status(500).json({ error: 'Internal server error while recording payment' });
        }
    }

    static async getPaymentByOrderId(req, res) {
        const orderId = req.params.orderId;

        if (!orderId) {
            return res.status(400).json({ error: 'Missing orderId parameter' });
        }

        try {
            const payment = await PaymentDAO.getByOrderId(parseInt(orderId, 10));

            if (!payment) {
                return res.status(404).json({ error: `Payment not found for order ID: ${orderId}` });
            }

            return res.status(200).json(payment);
        } catch (error) {
            console.error(`Error fetching payment for order ID ${orderId}:`, error.message);
            return res.status(500).json({ error: 'Internal server error while fetching payment' });
        }
    }

    static async getAllPayments(req, res) {
        try {
            const payments = await PaymentDAO.getAll();
            return res.status(200).json(payments);
        } catch (error) {
            console.error('Error fetching all payments:', error.message);
            return res.status(500).json({ error: 'Internal server error while fetching payments' });
        }
    }
}

export default PaymentController;