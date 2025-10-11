// src/daos/TiendaDAO.js
const Tienda = require('../models/Tienda');

class TiendaDAO {
  constructor() {
    this.model = Tienda;
  }

  async crear(tiendaObj) {
    try {
      const t = new this.model(tiendaObj);
      return await t.save();
    } catch (err) {
      throw err;
    }
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

  // Métodos específicos
  async agregarProducto(idTienda, producto) {
    return this.model.findByIdAndUpdate(idTienda, { $push: { productos: producto } }, { new: true }).lean();
  }

  async actualizarStockProducto(idTienda, idProducto, nuevoStock) {
    return this.model.findOneAndUpdate(
      { _id: idTienda, 'productos.id_producto': idProducto },
      { $set: { 'productos.$.stock': nuevoStock } },
      { new: true }
    ).lean();
  }
}

module.exports = TiendaDAO;
