import Product from '../entities/Product.js';
import ProductDAO from '../daos/ProductDAO.js';
import StoreDAO from '../daos/StoreDAO.js'; 

// Crear producto
export const create = async (req, res) => {
    try {
        const { name, description, price, stock, store_id } = req.body;

        if (!name || !price || !store_id) {
            return res.status(400).json({ error: 'Los campos name, price y store_id son obligatorios.' });
        }

        // Verificar que la tienda exista
        const store = await StoreDAO.getById(store_id);
        if (!store) {
            return res.status(404).json({ error: `La tienda con ID ${store_id} no existe.` });
        }

        const newProduct = new Product(null, name, description, price, stock, store_id);
        const insertedId = await ProductDAO.create(newProduct);

        return res.status(201).json({
            message: 'Producto creado exitosamente.',
            product_id: insertedId
        });
    } catch (err) {
        console.error(`Error in create: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};

// Obtener todos los productos
export const getAll = async (req, res) => {
    try {
        const products = await ProductDAO.getAll();
        return res.status(200).json(products);
    } catch (err) {
        console.error(`Error in getAll: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};

// Obtener producto por ID
export const getById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID del producto no es válido.' });
        }

        const product = await ProductDAO.getById(id);
        if (!product) {
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado.` });
        }

        return res.status(200).json(product);
    } catch (err) {
        console.error(`Error in getById: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};

// Actualizar producto
export const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const newData = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID del producto no es válido.' });
        }

        await ProductDAO.update(id, newData);

        return res.status(200).json({ message: 'Producto actualizado exitosamente.' });
    } catch (err) {
        console.error(`Error in update: ${err.message}`);
        if (err.message === 'Product not found') {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        if (err.message.includes('No fields') || err.message.includes('No valid values')) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: err.message });
    }
};

// Eliminar producto
export const deleted = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'El ID del producto no es válido.' });
        }

        await ProductDAO.delete(id);
        return res.status(200).json({ message: `Producto con ID ${id} eliminado correctamente.` });
    } catch (err) {
        console.error(`Error in deleted: ${err.message}`);
        if (err.message === 'Product not found') {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }
        return res.status(500).json({ error: err.message });
    }
};
