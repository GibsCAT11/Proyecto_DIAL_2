import DBConnection from '../db/connection';


class ClientDAO {
   /**
     * Saves a client to the database
     * @param {Object} clientData - Client data
     */
    static async create(clientData) {
        const db = await DBConnection.connect();
        const { name, phone, email, address } = clientData;

        const [result] = await db.execute(
            `INSERT INTO client (name, phone, email, address)
             VALUES (?, ?, ?, ?)`,
            [name, phone, email, address]
        );

        return result.insertId;
    }
  
    /**
     * Finds a client by their ID
     * @param {number} id - Client ID
     * @returns {Object|null}
     */
    static async getById(id) {
        const db = await DBConnection.connect();

        const [clients] = await db.execute(
            `SELECT client_id, name, phone, email, address 
             FROM client WHERE client_id = ?`,
            [id]
        );

        return clients[0] || null;
    }

    /**
     * Gets all clients
     * @returns {Array} List of clients
     */
    static async getAll() {
        const db = await DBConnection.connect();

        const [clients] = await db.execute(
            `SELECT client_id, name, phone, email, address FROM client`
        );
        return clients;
    }
    
    /**
     * Updates a client by ID
     * @param {number} id - Client ID
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
                `UPDATE client SET ${fields.join(', ')} WHERE client_id = ?`,
                [...values, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Client not found');
            }

            return result.affectedRows;

        } catch (err) {
            console.error('Error updating client:', err.message);
            return err.message;
        }
    }

    /**
     * Deletes a client from the database
     * @param {number} id - Client ID
     * @returns {number} Affected rows, or -1 if there is an error
     */
    static async delete(id) {
        try {
            const db = await DBConnection.connect();

            const [result] = await db.execute(
                'DELETE FROM client WHERE client_id = ?',
                [id]
            );

            return result.affectedRows;
        } catch (err) {
            console.error(`An error occurred while deleting the client: ${err.message}`);
            return -1;
        }
    }

}



export default ClientDAO;