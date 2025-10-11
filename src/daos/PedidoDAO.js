// src/daos/PedidoDAO.js
const Pedido = require('../models/Pedido');

class PedidoDAO {
  constructor() {
    this.model = Pedido;
  }

  async crear(pedidoObj) {
    const p = new this.model(pedidoObj);
    return p.save();
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

  async actualizarEstado(id, nuevoEstado) {
    return this.model.findByIdAndUpdate(id, { $set: { estado: nuevoEstado } }, { new: true }).lean();
  }
}

module.exports = PedidoDAO;
