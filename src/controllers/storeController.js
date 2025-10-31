import Store from '../entities/Store.js';
import StoreDAO from '../daos/StoreDAO.js';

export const create = async (req, res) => {
    try {
        const data = new Store(null, req.body.name, req.body.address, req.body.phone, req.body.schedule);
        const savedStore = await StoreDAO.create(data);
        return res.status(201).json(savedStore);

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
            error: 'The store ID is not valid.'
        });
        }
        const store = await StoreDAO.getById(id);
        if (!store) {
             return res.status(404).json({
            error: `Store with ID ${id} not found.`
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
        const stores = await StoreDAO.getAll();
        return res.status(200).json(stores);

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
                error: 'The store ID is not valid.'
            });
        }
        const newData = req.body;
        const result = await StoreDAO.update(id, newData);
        return res.status(200).json(result);

    } catch (err) {
        console.error(`Error in update: ${err.message}`);

        if (err.message.includes('No fields provided') || err.message.includes('No valid values')) {
            return res.status(400).json({
                error: err.message
            });
        }
        if (err.message.includes('Store not found')) {
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
                error: 'The store ID is not valid.'
            });
        }
        await StoreDAO.delete(id);
        return res.status(200).json({ message: `Store with ID ${id} deleted successfully.` });

    } catch (err) {
        console.error(`Error in deleted: ${err.message}`);
        if (err.message.includes('Store not found')) {
            return res.status(404).json({
                error: err.message
            });
        }
        return res.status(500).json({
            error: err.message
        });
    }
}