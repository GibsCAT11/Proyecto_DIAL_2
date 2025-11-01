import OrderDAO from '../daos/OrderDAO.js';
import Order from '../entities/Order.js';
import { ORDER_STATES } from '../constants/orderStates.js';

/**
 * Creates a new order.
 * req.body should contain: { total, client_id, store_id, ... (optional fields) }
 */
export const createOrder = async (req, res) => {
    try {
        const { total, client_id, store_id, pickup_code, order_date, state } = req.body;
        
        if (!total || !client_id || !store_id) {
            return res.status(400).json({
                error: 'Missing required fields: total, client_id, and store_id are required.'
            });
        }

        const orderData = new Order(
            null,
            order_date,
            state,
            total,
            client_id,
            store_id,
            pickup_code
        );

        const newOrderId = await OrderDAO.create(orderData);
        const newOrder = await OrderDAO.getById(newOrderId);
        
        return res.status(201).json(newOrder);

    } catch (err) {
        console.error(`Error in createOrder: ${err.message}`);
        return res.status(500).json({
            error: err.message
        });
    }
};

/**
 * Gets a single order by its ID.
 * req.params.id (order_id)
 */
export const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({
                error: 'The order ID is not valid.'
            });
        }
        
        const order = await OrderDAO.getById(id);
        
        if (!order) {
            return res.status(404).json({
                error: `Order with ID ${id} not found.`
            });
        }
        
        return res.status(200).json(order);

    } catch (err) {
        console.error(`Error in getOrderById: ${err.message}`);
        return res.status(500).json({
            error: err.message
        });
    }
};

/**
 * Gets all orders.
 */
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderDAO.getAll();
        return res.status(200).json(orders);

    } catch (err) {
        console.error(`Error in getAllOrders: ${err.message}`);
        return res.status(500).json({
            error: err.message
        });
    }
};

/**
 * Gets all orders for a specific client.
 * req.params.clientId
 */
export const getOrdersByClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        if (isNaN(clientId)) {
            return res.status(400).json({
                error: 'The client ID is not valid.'
            });
        }
        
        const orders = await OrderDAO.getByClientId(clientId);
        return res.status(200).json(orders);

    } catch (err) {
        console.error(`Error in getOrdersByClient: ${err.message}`);
        return res.status(500).json({
            error: err.message
        });
    }
};

/**
 * Updates an order's general data (NOT state).
 * req.params.id (order_id)
 * req.body: { total, store_id, ... }
 */
export const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({
                error: 'The order ID is not valid.'
            });
        }
        
        const newData = req.body;
        
        if (newData.state) {
            return res.status(400).json({
                error: 'To update the order state, please use the /status endpoint.'
            });
        }

        const result = await OrderDAO.update(id, newData);

        if (typeof result === 'string') {
            if (result.includes('Order not found')) {
                return res.status(404).json({ error: result });
            }
            if (result.includes('No fields provided') || result.includes('No valid values')) {
                return res.status(400).json({ error: result });
            }
        }

        const updatedOrder = await OrderDAO.getById(id);
        return res.status(200).json(updatedOrder);

    } catch (err) {
        console.error(`Error in updateOrder: ${err.message}`);
        return res.status(500).json({
            error: err.message
        });
    }
};

/**
 * Updates only the state of an order.
 * req.params.id (order_id)
 * req.body: { newState, pickupCode (optional), pickupDate (optional) }
 */
export const updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({
                error: 'The order ID is not valid.'
            });
        }
        
        const { newState, pickupCode, pickupDate } = req.body;

        if (!newState) {
            return res.status(400).json({
                error: 'The "newState" field is required.'
            });
        }

        if (!Object.values(ORDER_STATES).includes(newState)) {
            return res.status(400).json({
                error: `Invalid order state: ${newState}`
            });
        }
        
        await OrderDAO.updateState(id, newState, pickupCode, pickupDate);
        
        const updatedOrder = await OrderDAO.getById(id);
        return res.status(200).json(updatedOrder);

    } catch (err) {
        console.error(`Error in updateOrderStatus: ${err.message}`);
        return res.status(500).json({
            error: err.message
        });
    }
};
