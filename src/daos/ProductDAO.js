import DBConnection from '../db/connection';

class ProductDAO {
    /**
     * Saves a product to the database.
     * @param {Object} productData - Product data.
     */
    static async create(productData) {
        const db = await DBConnection.connect();
        const { name, description, price, stock, store_id } = productData;

        const [result] =await db.execute(
            `INSERT INTO product (name, description, price, stock, store_id)
             VALUES (?, ?, ?, ?, ?)`,
            [name, description, price, stock, store_id]
        );


        return result.insertId;

    }

    /**
     * Finds a product by its ID.
     * @param {number} id - Product ID (product_id).
     * @returns {Object|null} The product object or null.
     */
    static async getById(id) {
        const db = await DBConnection.connect();
        const [products] = await db.execute(
            `SELECT product_id, name, description, price, stock, store_id
             FROM product WHERE product_id = ?`,
            [id]
        );
        return products[0] || null;
    }

    /**
     * Retrieves all products from the database.
     * @returns {Array} List of all product objects.
     */
    static async getAll() {
        const db = await DBConnection.connect();
        const [products] = await db.execute(
            `SELECT product_id, name, description, price, stock, store_id
             FROM product`
        );
        return products;
    }

    /**
     * Retrieves products by store ID.
     * @param {number} storeId - Store ID (store_id).
     * @returns {Array} List of product objects.
     */
    static async getByStoreId(storeId) {
        const db = await DBConnection.connect();
        const [products] = await db.execute(
            `SELECT product_id, name, description, price, stock, store_id
             FROM product WHERE store_id = ?`,
            [storeId]
        );
        return products;
    }
    
      /**
     * Updates a Product by ID
     * @param {number} id - Product ID
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
                `UPDATE product SET ${fields.join(', ')} WHERE product_id = ?`,
                [...values, id]
            );

            if (result.affectedRows === 0) {
                throw new Error('Product not found');
            }

            return result.affectedRows;

        } catch (err) {
            console.error('Error updating product:', err.message);
            return err.message;
        }
    }

    /**
     * Deletes a producto from the database
     * @param {number} id - product ID
     * @returns {number} Affected rows, or -1 if there is an error
     */
    static async delete(id) {
        try {
            const db = await DBConnection.connect();

            const [result] = await db.execute(
                'DELETE FROM product WHERE product_id = ?',
                [id]
            );

            return result.affectedRows;
        } catch (err) {
            console.error(`An error occurred while deleting the product: ${err.message}`);
            return -1;
        }
    }
    

}

export default ProductDAO;