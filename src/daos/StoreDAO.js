import DBConnection from '../db/connection';

class StoreDAO {
    /**
     * Saves a store to the database.
     * @param {Object} storeData - Store data (name, address, phone, schedule).
     */
    static async create(storeData) {
        const db = await DBConnection.connect();
        const { name, address, phone, schedule } = storeData;

        const [result] = await db.execute(
            `INSERT INTO store (name, address, phone, schedule)
             VALUES (?, ?, ?, ?)`,
            [name, address, phone, schedule]
        );
        return result.insertId;
    }

    /**
     * Finds a store by its ID.
     * @param {number} id - Store ID (store_id).
     * @returns {Object|null} The store object or null.
     */
    static async getById(id) {
        const db = await DBConnection.connect();
        const [stores] = await db.execute(
            `SELECT store_id, name, address, phone, schedule 
             FROM store WHERE store_id = ?`,
            [id]
        );
        return stores[0] || null;
    }

    /**
     * Retrieves all stores.
     * @returns {Array} List of all store objects.
     */
    static async getAll() {
        const db = await DBConnection.connect();
        const [stores] = await db.execute(
            `SELECT store_id, name, address, phone, schedule FROM store`
        );
        return stores;
    }


     /**
     * Updates a Store by ID
     * @param {number} id - Store ID
     * @param {Object} data - Fields to update
     * @returns {number|string} Affected rows or error message
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
                    fields.push(`${key} = ?`);
                    values.push(value);
                }
            }

            if (fields.length === 0) {
                throw new Error('No valid values to update');
            }

            const [result] = await db.execute(
                `UPDATE store SET ${fields.join(', ')} WHERE store_id = ?`,
                [...values, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Store not found');
            }

            return result.affectedRows;

        } catch (err) {
            console.error('Error updating Store:', err.message);
            return err.message;
        }
    }

   /**
     * Deletes a Store from the database
     * @param {number} id - Store ID
     * @returns {number} Affected rows, or -1 if there is an error
     */
    static async delete(id) {
        try {
            const db = await DBConnection.connect();
            const [result] = await db.execute(`DELETE from store WHERE store_id = ? `, [id])
            return result.affectedRows;
        }catch(err){
            console.error(`An error occurred while deleting the store: ${err.message}`);
            return -1;
        }
        
    }
}

export default StoreDAO;