import DBConnection from '../db/connection';
import { ORDER_STATES } from '../constants/orderStates.js'; 
class OrderDAO {
    /**
     * Saves a new order to the database.
     * @param {Object} orderData - Order data.
     */
    static async create(orderData) {
        const db = await DBConnection.connect();
        
        // Asignamos el estado por defecto del ENUM si no se proporciona
        const orderState = orderData.state || ORDER_STATES.PENDING; 
        
        const { order_date, total, client_id, store_id, pickup_code } = orderData;

        const [result] = await db.execute(
            `INSERT INTO client_order 
             (order_date, state, total, client_id, store_id, pickup_code)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [order_date || new Date(), orderState, total, client_id, store_id, pickup_code]
        );
        return result.insertId;
    }

    /**
     * Finds an order by its ID.
     * @param {number} id - Order ID (order_id).
     * @returns {Object|null} The order object or null.
     */
    static async getById(id) {
        const db = await DBConnection.connect();
        const [orders] = await db.execute(
            `SELECT order_id, order_date, state, total, client_id, store_id, pickup_code, pickup_date 
             FROM client_order 
             WHERE order_id = ?`,
            [id]
        );
        return orders[0] || null;
    }

      /**
     * Finds an all order.
     * @returns {Array} List orders.
     */
    static async getAll() {
        const db = await DBConnection.connect();
        const [orders] = await db.execute(
            `SELECT order_id, order_date, state, total, client_id, store_id, pickup_code, pickup_date 
             FROM client_order`,
        );
        return orders;
    }
    
    /**
     * Updates the state and sets the pickup code and date.
     * @param {number} id - Order ID.
     * @param {string} newState - The new state from ORDER_STATES.
     * @param {string|null} [pickupCode=null] - Security code.
     * @param {Date|null} [pickupDate=null] - Date of physical pickup.
     */
    static async updateState(id, newState, pickupCode = null, pickupDate = null) {
        const db = await DBConnection.connect();
        
        if (!Object.values(ORDER_STATES).includes(newState)) {
             throw new Error(`Invalid order state: ${newState}`);
        }

        await db.execute(
            `UPDATE client_order SET state = ?, pickup_code = ?, pickup_date = ? 
             WHERE order_id = ?`,
            [newState, pickupCode, pickupDate, id]
        );
    }


    /**
     * Retrieves all orders for a specific client.
     * @param {number} clientId - The ID of the client.
     * @returns {Array} List of order objects (or an empty array).
     */
    static async getByClientId(clientId) {
        const db = await DBConnection.connect();
        const [orders] = await db.execute(
            `SELECT order_id, order_date, state, total, client_id, store_id, pickup_code, pickup_date 
             FROM client_order 
             WHERE client_id = ? 
             ORDER BY order_date DESC`,
            [clientId]
        );
        return orders;
    }

    /**
     * Updates an order by ID dynamically (used for fields other than state).
     * @param {number} id - Order ID (order_id).
     * @param {Object} data - Fields to update.
     * @returns {number|string} Affected rows or error message.
     */
    static async update(id, data) {
        const db = await DBConnection.connect();
        try {
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No fields provided for update');
            }

            const fields = [];
            const values = [];

            for (const [key, value] of Object.entries(data)) {
                if (value !== undefined && value !== null) {
                    // Prevenir la actualización del order_id
                    if (key === 'order_id') continue; 
                    
                    fields.push(`${key} = ?`);
                    values.push(value);
                }
            }

            if (fields.length === 0) {
                throw new Error('No valid values to update');
            }

            const [result] = await db.execute(
                `UPDATE client_order SET ${fields.join(', ')} WHERE order_id = ?`,
                [...values, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Order not found');
            }

            return result.affectedRows;

        } catch (err) {
            console.error('Error updating order:', err.message);
            return err.message;
        }
    }

}

export default OrderDAO;