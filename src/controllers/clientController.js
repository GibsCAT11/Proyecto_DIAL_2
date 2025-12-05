import Client from '../entities/Client.js';
import ClientDAO from '../daos/ClientDAO.js';

export const create = async (req, res) => {
    try {
        const data = new Client(null, req.body.name, req.body.phone, req.body.email, req.body.address);
        const clientId = await ClientDAO.create(data);
        return res.status(201).json({ message: 'Client created successfully', client_id: clientId });
    } catch (err) {
        console.error(`Error in create: ${err.message}`);
        if (err.message.includes('All fields are required')) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: err.message });
    }
};

export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'The client ID is not valid.' });
        }

        const client = await ClientDAO.getById(id);
        if (!client) {
            return res.status(404).json({ error: `Client with ID ${id} not found.` });
        }

        return res.status(200).json(client);
    } catch (err) {
        console.error(`Error in getById: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const clients = await ClientDAO.getAll();
        return res.status(200).json(clients);
    } catch (err) {
        console.error(`Error in getAll: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'The client ID is not valid.' });
        }

        const newData = req.body;
        const result = await ClientDAO.update(id, newData);

        return res.status(200).json({ message: 'Client updated successfully.', result });
    } catch (err) {
        console.error(`Error in update: ${err.message}`);

        if (err.message.includes('No fields provided') || err.message.includes('No valid values')) {
            return res.status(400).json({ error: err.message });
        }
        if (err.message.includes('Client not found')) {
            return res.status(404).json({ error: err.message });
        }

        return res.status(500).json({ error: err.message });
    }
};

export const deleted = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: 'The client ID is not valid.' });
        }

        const affectedRows = await ClientDAO.delete(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: `Client with ID ${id} not found.` });
        }

        return res.status(200).json({ message: `Client with ID ${id} deleted successfully.` });
    } catch (err) {
        console.error(`Error in deleted: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};
