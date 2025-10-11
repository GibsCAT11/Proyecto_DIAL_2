// src/models/Pedido.js
const mongoose = require('mongoose');

const PedidoProductoSchema = new mongoose.Schema({
  id_producto: { type: Number, required: true },
  nombre: String,
  precio: mongoose.Schema.Types.Decimal128,
  cantidad: Number
}, { _id: false });

const PagoSchema = new mongoose.Schema({
  monto: mongoose.Schema.Types.Decimal128,
  fecha_pago: Date,
  metodo_pago: String
}, { _id: false });

const PedidoSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  id_cliente: { type: Number, required: true },
  id_tienda: { type: Number, required: true },
  fecha_pedido: { type: Date, default: Date.now },
  estado: String,
  total: mongoose.Schema.Types.Decimal128,
  productos: [PedidoProductoSchema],
  pago: PagoSchema
}, { collection: 'Pedidos' });

module.exports = mongoose.model('Pedido', PedidoSchema);
