import Product from '../entities/Product.js';
import ProductDAO from '../daos/ProductDAO.js';

export const create = async (req, res) => {
    try {
        const data = new Product(null,req.body.name, req.body.description,req.body.price, req.body.stock, req.body.store_id);
        const savedProduct = await ProductDAO.create(data);
        return res.status(201).json(savedProduct);

    } catch (err) {
        console.error(`Error in create: ${err.message}`);
        if (err.message.includes('All fields are required')) {
            return res.status(400).json({
                error: err.message
            });
        }
        return res.status(500).json({
            error: err.message
        });
    }
}

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({
            error: 'The product ID is not valid.'
        });
        }
        const product = await ProductDAO.getById(id);
        if (!product) {
             return res.status(404).json({
            error: `Product with ID ${id} not found.`
        });
        }
        return res.status(200).json(store);
    } catch (err) {
        console.error(`Error in getById: ${err.message}`);
        return res.status(500).json({
            error: err.message
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const product = await ProductDAO.getAll();
        return res.status(200).json(product);

    } catch (err) {
        console.error(`Error in getAll: ${err.message}`);
        return res.status(500).json({
            error: err.message
        });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({
                error: 'The product ID is not valid.'
            });
        }
        const newData = req.body;
        const result = await ProductDAO.update(id, newData);
        return res.status(200).json(result);

    } catch (err) {
        console.error(`Error in update: ${err.message}`);

        if (err.message.includes('No fields provided') || err.message.includes('No valid values')) {
            return res.status(400).json({
                error: err.message
            });
        }
        if (err.message.includes('Product not found')) {
            return res.status(404).json({
                error: err.message
            });
        }
        return res.status(500).json({
            error: err.message
        });
    }
}

export const deleted = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
             return res.status(400).json({
                error: 'The prduct ID is not valid.'
            });
        }
        await ProductDAO.delete(id);
        return res.status(200).json({ message: `Product with ID ${id} deleted successfully.` });

    } catch (err) {
        console.error(`Error in deleted: ${err.message}`);
        if (err.message.includes('Product not found')) {
            return res.status(404).json({
                error: err.message
            });
        }
        return res.status(500).json({
            error: err.message
        });
    }
}