// src/data_access/PaymentDAO.js
import DBConnection from '../db/connection.js';

class PaymentDAO {
    /**
     * Records a payment in the database.
     * @param {Object} paymentData - Payment data.
     */
    static async recordPayment(paymentData) {
        const db = await DBConnection.connect();
        const { amount, payment_date, payment_method, order_id } = paymentData;

        await db.execute(
            `INSERT INTO payment (amount, payment_date, payment_method, order_id)
             VALUES (?, ?, ?, ?)`,
            [amount, payment_date || new Date(), payment_method, order_id]
        );
    }

    /**
     * Finds a payment by its order ID.
     * @param {number} orderId - Order ID (order_id).
     * @returns {Object|null} The payment object or null.
     */
    static async getByOrderId(orderId) {
        const db = await DBConnection.connect();
        const [payments] = await db.execute(
            `SELECT payment_id, amount, payment_date, payment_method, order_id
             FROM payment WHERE order_id = ?`,
            [orderId]
        );
        return payments[0] || null;
    }

    
    /**
     * Retrieves all payment records.
     * @returns {Array} List of all payment objects.
     */
    static async getAll() {
        const db = await DBConnection.connect();
        const [payments] = await db.execute(
            `SELECT payment_id, amount, payment_date, payment_method, order_id
             FROM payment`
        );
        return payments;
    }
}

export default PaymentDAO;