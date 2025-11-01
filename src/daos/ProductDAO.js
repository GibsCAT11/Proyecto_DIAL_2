import DBConnection from '../db/connection.js';

class ProductDAO {
    /**
     * Inserta un nuevo producto en la base de datos.
     * @param {Object} productData - Datos del producto (name, description, price, stock, store_id)
     * @returns {number} ID del producto insertado.
     */
    static async create(productData) {
        const db = await DBConnection.connect();
        const { name, description, price, stock, store_id } = productData;

        // Validación de campos obligatorios
        if (!name || !price || !store_id) {
            throw new Error('Missing required fields: name, price, store_id');
        }

        const [result] = await db.execute(
            `INSERT INTO product (name, description, price, stock, store_id)
             VALUES (?, ?, ?, ?, ?)`,
            [name, description, price, stock, store_id]
        );

        return result.insertId;
    }

    /**
     * Busca un producto por su ID.
     * @param {number} id - ID del producto.
     * @returns {Object|null} Producto o null si no existe.
     */
    static async getById(id) {
        const db = await DBConnection.connect();

        const [rows] = await db.execute(
            `SELECT product_id, name, description, price, stock, store_id
             FROM product WHERE product_id = ?`,
            [id]
        );

        return rows[0] || null;
    }

    /**
     * Obtiene todos los productos.
     * @returns {Array} Lista de productos.
     */
    static async getAll() {
        const db = await DBConnection.connect();

        const [rows] = await db.execute(
            `SELECT product_id, name, description, price, stock, store_id
             FROM product`
        );

        return rows;
    }

    /**
     * Obtiene todos los productos pertenecientes a una tienda específica.
     * @param {number} storeId - ID de la tienda.
     * @returns {Array} Lista de productos.
     */
    static async getByStoreId(storeId) {
        const db = await DBConnection.connect();

        const [rows] = await db.execute(
            `SELECT product_id, name, description, price, stock, store_id
             FROM product WHERE store_id = ?`,
            [storeId]
        );

        return rows;
    }

    /**
     * Actualiza un producto por su ID.
     * @param {number} id - ID del producto.
     * @param {Object} data - Campos a actualizar.
     * @returns {number} Número de filas afectadas.
     */
    static async update(id, data) {
        const db = await DBConnection.connect();

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
            `UPDATE product SET ${fields.join(', ')} WHERE product_id = ?`,
            [...values, id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Product not found');
        }

        return result.affectedRows;
    }

    /**
     * Elimina un producto por su ID.
     * @param {number} id - ID del producto.
     * @returns {number} Filas afectadas.
     */
    static async delete(id) {
        const db = await DBConnection.connect();

        const [result] = await db.execute(
            `DELETE FROM product WHERE product_id = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Product not found');
        }

        return result.affectedRows;
    }
}

export default ProductDAO;
