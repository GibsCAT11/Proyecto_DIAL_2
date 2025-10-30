import DBConnection from '../db/connection';

class CartDAO {

       /**
     * Finds the active cart for a specific client ID.
     * @param {number} clientId - Client ID (client_id).
     * @returns {Object|null} The client's active cart object or null.
     */
    static async getByClientId(clientId) {
        const db = await DBConnection.connect();
        const [carts] = await db.execute(
            `SELECT cart_id, creation_date, client_id
             FROM cart WHERE client_id = ?`,
            [clientId]
        );
        return carts[0] || null; 
    }


    /**
     * Saves a cart to the database. 
     * @param {Object} cartData - Cart data (creation_date, client_id).
     * @returns {number} The ID of the created or existing cart.
     */
    static async create(cartData) {
        const db = await DBConnection.connect();
        const { creation_date, client_id } = cartData;

        const existingCart = await this.getByClientId(client_id);
        
        if (existingCart) {
            return existingCart.cart_id;
        }

        const [result] = await db.execute(
            `INSERT INTO cart (creation_date, client_id)
             VALUES (?, ?)`,
            [creation_date || new Date(), client_id] 
        );
        
        return result.insertId;
    }
    /**
     * Finds a cart by its ID.
     * @param {number} id - Cart ID (cart_id).
     * @returns {Object|null} The cart object or null.
     */
    static async getById(id) {
        const db = await DBConnection.connect();
        const [carts] = await db.execute(
            `SELECT cart_id, creation_date, client_id
             FROM cart WHERE cart_id = ?`,
            [id]
        );
        return carts[0] || null;
    }
    
    /**
     * Finds all carts.
     * @returns {Array} List of all cart objects.
     */
    static async getAll() {
        const db = await DBConnection.connect();
        const [carts] = await db.execute(
            `SELECT cart_id, creation_date, client_id
             FROM cart`
        );
        return carts; // CORREGIDO: Devuelve el array completo
    }

 
}

export default CartDAO;