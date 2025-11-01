// src/data_access/CartDetailDAO.js
import DBConnection from '../db/connection.js';

class CartDetailDAO {
   
    /**
     * Inserts an item if it doesn't exist, or updates the quantity if it does.
     * This ensures only one row exists per product in a cart.
     * @param {Object} detailData - { quantity, cart_id, product_id }.
     */
    static async upsertItem(detailData) {
        const db = await DBConnection.connect();
        const { quantity, cart_id, product_id } = detailData;

        const [updateResult] = await db.execute(
            `UPDATE cart_detail 
             SET quantity = quantity + ? 
             WHERE cart_id = ? AND product_id = ?`,
            [quantity, cart_id, product_id]
        );

        if (updateResult.affectedRows === 0) {
            const [result] = await db.execute(
                `INSERT INTO cart_detail (quantity, cart_id, product_id)
                 VALUES (?, ?, ?)`,
                [quantity, cart_id, product_id]
            );
            return result.insertId;
        }
        
        return cart_id;
    }


    /**
     * Retrieves all items for a given cart ID.
     * @param {number} cartId - Cart ID (cart_id).
     * @returns {Array} List of cart detail objects.
     */
    static async getItemsByCartId(cartId) {
        const db = await DBConnection.connect();
        const [details] = await db.execute(
            `SELECT detail_id, quantity, cart_id, product_id
             FROM cart_detail WHERE cart_id = ?`,
            [cartId]
        );
        return details;
    }
    

    /**
     * Updates the quantity of a specific item in the cart.
     * @param {number} detailId - Cart Detail ID (detail_id).
     * @param {number} newQuantity - The new quantity for the item.
     * @returns {number} Affected rows.
     */
    static async updateQuantity(detailId, newQuantity) {
        if (newQuantity <= 0) {
            return this.delete(detailId); 
        }

        const db = await DBConnection.connect();
        const [result] = await db.execute(
            `UPDATE cart_detail SET quantity = ? WHERE detail_id = ?`,
            [newQuantity, detailId]
        );

        if (result.affectedRows === 0) {
            throw new Error('Cart detail item not found');
        }
        return result.affectedRows;
    }

    /**
     * Deletes a  cart detail from the database
     * @param {number} id -  cart detail ID
     * @returns {number} Affected rows, or -1 if there is an error
     */
    static async delete(id) {
        try {
            const db = await DBConnection.connect();

            const [result] = await db.execute(
                'DELETE FROM cart_detail WHERE detail_id = ?',
                [id]
            );

            return result.affectedRows;
        } catch (err) {
            console.error(`An error occurred while deleting the  cart detail: ${err.message}`);
            return -1;
        }
    }
}

export default CartDetailDAO;