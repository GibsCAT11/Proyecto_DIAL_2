import DBConnection from '../db/connection.js';

class StoreDAO {
    /**
     * Saves a store to the database.
     * @param {Object} storeData - Store data (name, address, phone, schedule).
     */
    static async create(storeData) {
        try {
            const db = await DBConnection.connect();
            const { name, address, phone, schedule } = storeData;
            if(!name || !address || !phone || !schedule){
                throw new Error('All fields are required'); 
            }

            const [result] = await db.execute(
                `INSERT INTO store (name, address, phone, schedule)
                 VALUES (?, ?, ?, ?)`,
                [name, address, phone, schedule]
            );
            
            return { id: result.insertId, name, address, phone, schedule };
        } catch (err) {
            console.error('Error creating store:', err.message);
            throw err; 
        }
    }

    /**
     * Finds a store by its ID.
     * @param {number} id - Store ID (store_id).
     * @returns {Object|null} The store object or null.
     */
    static async getById(id) {
        try {
            const db = await DBConnection.connect();
            const [stores] = await db.execute(
                `SELECT store_id, name, address, phone, schedule 
                 FROM store WHERE store_id = ?`,
                [id]
            );
            return stores[0] || null;
        } catch (err) {
            console.error('Error fetching store by ID:', err.message);
            throw err;
        }
    }

    /**
     * Retrieves all stores.
     * @returns {Array} List of all store objects.
     */
    static async getAll() {
        try {
            const db = await DBConnection.connect();
            const [stores] = await db.execute(
                `SELECT store_id, name, address, phone, schedule FROM store`
            );
            return stores;
        } catch (err) {
            console.error('Error fetching all stores:', err.message);
            throw err;
        }
    }

    /**
     * Updates a Store by ID
     * @param {number} id - Store ID
     * @param {Object} data - Fields to update
     * @returns {Object} The updated store object
     */
    static async update(id, data) {
        const db = await DBConnection.connect();
        try {
            if (!data || Object.keys(data).length === 0) {
                throw new Error('No fields provided for update'); 
            }

            const fields = [];
            const values = [];
            const validKeys = ['name', 'address', 'phone', 'schedule']; 
            
            for (const [key, value] of Object.entries(data)) {
                if (validKeys.includes(key) && value !== undefined && value !== null) {
                    fields.push(`${key} = ?`);
                    values.push(value);
                }
            }

            if (fields.length === 0) {
                throw new Error('No valid values to update'); 
            }

            const [updateResult] = await db.execute(
                `UPDATE store SET ${fields.join(', ')} WHERE store_id = ?`,
                [...values, id]
            );

            if (updateResult.affectedRows === 0) {
                throw new Error('Store not found'); 
            }
            
            const [rows] = await db.execute(
                `SELECT store_id, name, address, phone, schedule FROM store WHERE store_id = ?`,
                [id]
            );
            
            return rows[0]; 

        } catch (err) {
            console.error('Error updating Store in DAO:', err.message);
            throw err; 
        }
    }

    /**
     * Deletes a Store from the database
     * @param {number} id - Store ID
     * @returns {number} Affected rows.
     */
    static async delete(id) {
        try {
            const db = await DBConnection.connect();
            const [result] = await db.execute(`DELETE from store WHERE store_id = ?`, [id]);
            
            if (result.affectedRows === 0) {
                throw new Error('Store not found');
            }
            
            return result.affectedRows;
        } catch (err) {
            console.error(`An error occurred while deleting the store: ${err.message}`);
            throw err;
        }
    }
}

export default StoreDAO;