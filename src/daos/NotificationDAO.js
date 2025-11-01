// src/data_access/NotificationDAO.js
import DBConnection from '../db/connection.js';

class NotificationDAO {
    /**
     * Creates a new notification.
     * @param {Object} notificationData - Notification data.
     */
    static async create(notificationData) {
        const db = await DBConnection.connect();
        const { message, sent_date, type, order_id } = notificationData;

        const [result] = await db.execute(
            `INSERT INTO notification (message, sent_date, type, order_id)
             VALUES (?, ?, ?, ?)`,
            [message, sent_date || new Date(), type, order_id]
        );

        return result.insertId;

    }

    /**
     * Retrieves all notifications for a given order ID.
     * @param {number} orderId - Order ID (order_id).
     * @returns {Array} List of notification objects.
     */
    static async getByOrderId(orderId) {
        const db = await DBConnection.connect();
        const [notifications] = await db.execute(
            `SELECT notification_id, message, sent_date, type, order_id
             FROM notification WHERE order_id = ?`,
            [orderId]
        );
        return notifications;
    }


    /**
     * Retrieves all notifications relevant to a specific client.
     * Requires joining with the client_order table.
     * @param {number} clientId - Client ID.
     * @returns {Array} List of notification objects.
     */
    static async getByClientId(clientId) {
        const db = await DBConnection.connect();
        const [notifications] = await db.execute(
            `SELECT 
                n.notification_id, n.message, n.sent_date, n.type, n.order_id
             FROM notification n
             JOIN client_order co ON n.order_id = co.order_id
             WHERE co.client_id = ?
             ORDER BY n.sent_date DESC`,
            [clientId]
        );
        return notifications;
    }

}

export default NotificationDAO;