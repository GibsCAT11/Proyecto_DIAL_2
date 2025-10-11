// src/models/Notificacion.js
const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  id_cliente: Number,
  id_pedido: Number,
  mensaje: String,
  fecha_envio: { type: Date, default: Date.now },
  tipo: String
}, { collection: 'Notificaciones' });

module.exports = mongoose.model('Notificacion', NotificacionSchema);
