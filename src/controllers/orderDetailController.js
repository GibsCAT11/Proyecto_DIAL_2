import OrderDetailDAO from '../daos/OrderDetailDAO.js';
import OrderDAO from '../daos/OrderDAO.js';
import OrderDetail from '../entities/OrderDetail.js';

/**
 * Gets all detail items for a specific order.
 * (e.g., /api/orders/:orderId/details)
 */
export const getOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        if (isNaN(orderId)) {
            return res.status(400).json({ error: 'The order ID is not valid.' });
        }

        const orderExists = await OrderDAO.getById(orderId);
        if (!orderExists) {
            return res.status(404).json({ error: `Order with ID ${orderId} not found.` });
        }

        const details = await OrderDetailDAO.getItemsByOrderId(orderId);
        return res.status(200).json(details);

    } catch (err) {
        console.error(`Error in getOrderDetails: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Adds an item to an existing order.
 * (e.g., /api/orders/:orderId/details)
 * req.body: { quantity, salePrice, productId }
 */
export const addOrderItem = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        if (isNaN(orderId)) {
            return res.status(400).json({ error: 'The order ID is not valid.' });
        }

        const { quantity, salePrice, productId } = req.body;

        if (!quantity || !salePrice || !productId) {
            return res.status(400).json({
                error: 'Missing required fields: quantity, salePrice, and productId are required.'
            });
        }

        const orderExists = await OrderDAO.getById(orderId);
        if (!orderExists) {
            return res.status(404).json({ error: `Order with ID ${orderId} not found.` });
        }

        const detailData = new OrderDetail(
            null,     
            quantity,
            salePrice,
            orderId,
            productId
        );

        const newItemId = await OrderDetailDAO.addItem(detailData);

        return res.status(201).json({
            message: "Item added successfully",
            detailOrderId: newItemId
        });

    } catch (err) {
        console.error(`Error in addOrderItem: ${err.message}`);
        return res.status(500).json({ error: err.message });
    }
};
