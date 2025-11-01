import DBConnection from '../db/connection.js';

class OrderDetailDAO {
    /**
     * Adds an item to the order detail (usually when finalizing the cart).
     * @param {Object} detailData - Detail data (quantity, sale_price, order_id, product_id).
     */
    static async addItem(detailData) {
        const db = await DBConnection.connect();
        const { quantity, sale_price, order_id, product_id } = detailData;

        const [result] =await db.execute(
            `INSERT INTO order_detail (quantity, sale_price, order_id, product_id)
             VALUES (?, ?, ?, ?)`,
            [quantity, sale_price, order_id, product_id]
        );

        return result.insertId;

    }

    /**
     * Retrieves all items for a given order ID.
     * @param {number} orderId - Order ID (order_id).
     * @returns {Array} List of order detail objects.
     */
    static async getItemsByOrderId(orderId) {
        const db = await DBConnection.connect();
        const [details] = await db.execute(
            `SELECT detail_order_id, quantity, sale_price, order_id, product_id
             FROM order_detail WHERE order_id = ?`,
            [orderId]
        );
        return details;
    }
}

export default OrderDetailDAO;