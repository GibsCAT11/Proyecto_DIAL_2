import DBConnection from '../db/connection.js';
import Client from '../entities/Client.js';

class ClientDAO {

    // 🔹 Registrar un nuevo cliente (desde authController)
    static async register({ name, email, password }) {
        const db = await DBConnection.connect();

        const [result] = await db.execute(
            `INSERT INTO client (name, email, password)
             VALUES (?, ?, ?)`,
            [name, email, password]
        );

        return result.insertId;
    }

    // 🔹 Buscar cliente por email (para login o validación de registro)
    static async findByEmail(email) {
        const db = await DBConnection.connect();

        const [rows] = await db.execute(
            `SELECT * FROM client WHERE email = ?`,
            [email]
        );

        if (rows.length === 0) return null;

        const { client_id, name, phone, email: clientEmail, address, password } = rows[0];
        return new Client(client_id, name, phone, clientEmail, address, password);
    }

    // 🔹 Obtener cliente por ID
    static async getById(id) {
        const db = await DBConnection.connect();

        const [rows] = await db.execute(
            `SELECT client_id, name, phone, email, address
             FROM client WHERE client_id = ?`,
            [id]
        );

        if (rows.length === 0) return null;

        const { client_id, name, phone, email, address } = rows[0];
        return new Client(client_id, name, phone, email, address);
    }

    // 🔹 Obtener todos los clientes
    static async getAll() {
        const db = await DBConnection.connect();

        const [rows] = await db.execute(
            `SELECT client_id, name, phone, email, address FROM client`
        );

        return rows.map(row =>
            new Client(row.client_id, row.name, row.phone, row.email, row.address)
        );
    }

    // 🔹 Actualizar cliente
    static async update(id, newData) {
        const db = await DBConnection.connect();

        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(newData)) {
            if (value !== undefined && key !== 'client_id') {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        }

        if (fields.length === 0) throw new Error('No fields provided for update');

        values.push(id);

        const [result] = await db.execute(
            `UPDATE client SET ${fields.join(', ')} WHERE client_id = ?`,
            values
        );

        if (result.affectedRows === 0) throw new Error('Client not found');

        return await this.getById(id);
    }

    // 🔹 Eliminar cliente
    static async delete(id) {
        const db = await DBConnection.connect();

        const [result] = await db.execute(
            `DELETE FROM client WHERE client_id = ?`,
            [id]
        );

        if (result.affectedRows === 0) throw new Error('Client not found');
    }
}

export default ClientDAO;
