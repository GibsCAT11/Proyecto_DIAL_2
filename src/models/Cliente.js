// src/models/Cliente.js
const mongoose = require('mongoose');

const CarritoProductoSchema = new mongoose.Schema({
  id_producto: { type: Number, required: true },
  nombre: String,
  precio: mongoose.Schema.Types.Decimal128,
  cantidad: Number,
  id_tienda: Number
}, { _id: false });

const CarritoSchema = new mongoose.Schema({
  fecha_creacion: { type: Date, default: Date.now },
  productos: [CarritoProductoSchema]
}, { _id: false });

const ClienteSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  nombre: String,
  telefono: String,
  correo: String,
  direccion: String,
  carrito: CarritoSchema
}, { collection: 'Clientes' });

module.exports = mongoose.model('Cliente', ClienteSchema);
