// src/models/Tienda.js
const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  id_empleado: { type: Number, required: true },
  nombre: String,
  puesto: String,
  telefono: String,
  correo: String
}, { _id: false });

const ProductoSchema = new mongoose.Schema({
  id_producto: { type: Number, required: true },
  nombre: String,
  descripcion: String,
  precio: mongoose.Schema.Types.Decimal128, // usa Decimal128 para precios
  stock: Number
}, { _id: false });

const TiendaSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, // según tu modelo, usas int como _id
  nombre: String,
  direccion: String,
  telefono: String,
  horario: String,
  empleados: [EmpleadoSchema],
  productos: [ProductoSchema]
}, { collection: 'Tiendas' });

module.exports = mongoose.model('Tienda', TiendaSchema);
