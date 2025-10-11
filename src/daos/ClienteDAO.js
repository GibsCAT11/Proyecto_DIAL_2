// src/daos/ClienteDAO.js
const Cliente = require('../models/Cliente');

class ClienteDAO {
  constructor() {
    this.model = Cliente;
  }

  async crear(clienteObj) {
    const c = new this.model(clienteObj);
    return c.save();
  }

  async obtenerPorId(id) {
    return this.model.findById(id).lean();
  }

  async obtenerTodos(filter = {}) {
    return this.model.find(filter).lean();
  }

  async actualizar(id, cambios) {
    return this.model.findByIdAndUpdate(id, cambios, { new: true }).lean();
  }

  async eliminar(id) {
    return this.model.findByIdAndDelete(id).lean();
  }

  // Carrito
  async agregarProductoCarrito(idCliente, productoCarrito) {
    return this.model.findByIdAndUpdate(idCliente, { $push: { 'carrito.productos': productoCarrito } }, { new: true }).lean();
  }

  async vaciarCarrito(idCliente) {
    return this.model.findByIdAndUpdate(idCliente, { $set: { 'carrito.productos': [] } }, { new: true }).lean();
  }
}

module.exports = ClienteDAO;
