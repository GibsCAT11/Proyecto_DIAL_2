import Notification from '../entities/Notification.js'; 
import NotificationDAO from '../daos/NotificationDAO.js'; 


export const create = async (req, res) => {
    try {
     
        const data = new Notification(
            null, 
            req.body.message, 
            req.body.sent_date, // Puede ser null, el constructor lo maneja
            req.body.type, 
            req.body.order_id
        );
        
        // Asumiendo que el DAO devuelve el ID insertado
        const newNotificationId = await NotificationDAO.create(data); 
        
        // En lugar de devolver el objeto completo, devolvemos el ID de la nueva notificación
        return res.status(201).json({ 
            notification_id: newNotificationId,
            message: 'Notificación creada exitosamente.'
        });

    } catch (err) {
        console.error(`Error en create (Notification): ${err.message}`);
        
        // Manejo de errores específicos (ej. validación)
        if (err.message.includes('required') || err.message.includes('invalid')) {
            return res.status(400).json({
                error: err.message
            });
        }
        
        // Error interno del servidor
        return res.status(500).json({
            error: 'Error interno del servidor al crear la notificación.'
        });
    }
}


export const getByOrderId = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        
        if (isNaN(orderId)) {
            return res.status(400).json({
                error: 'El ID de pedido (orderId) no es válido.'
            });
        }
        
        const notifications = await NotificationDAO.getByOrderId(orderId);
        
        if (!notifications || notifications.length === 0) {
            return res.status(404).json({
                error: `No se encontraron notificaciones para el Order ID ${orderId}.`
            });
        }
        
        return res.status(200).json(notifications);
        
    } catch (err) {
        console.error(`Error en getByOrderId (Notification): ${err.message}`);
        return res.status(500).json({
            error: 'Error interno del servidor al obtener las notificaciones por Order ID.'
        });
    }
}


export const getByClientId = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        
        if (isNaN(clientId)) {
            return res.status(400).json({
                error: 'El ID de cliente (clientId) no es válido.'
            });
        }
        
        const notifications = await NotificationDAO.getByClientId(clientId);
        
        if (!notifications || notifications.length === 0) {
            return res.status(404).json({
                error: `No se encontraron notificaciones para el Client ID ${clientId}.`
            });
        }
        
        return res.status(200).json(notifications);
        
    } catch (err) {
        console.error(`Error en getByClientId (Notification): ${err.message}`);
        return res.status(500).json({
            error: 'Error interno del servidor al obtener las notificaciones por Client ID.'
        });
    }
}

