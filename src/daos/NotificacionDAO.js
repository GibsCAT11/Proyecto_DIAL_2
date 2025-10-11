// src/daos/NotificacionDAO.js
const Notificacion = require('../models/Notificacion');

class NotificacionDAO {
  constructor() {
    this.model = Notificacion;
  }

  async crear(notifObj) {
    const n = new this.model(notifObj);
    return n.save();
  }

  async obtenerPorId(id) {
    return this.model.findById(id).lean();
  }

  async obtenerTodos(filter = {}) {
    return this.model.find(filter).lean();
  }

  async eliminar(id) {
    return this.model.findByIdAndDelete(id).lean();
  }
}

module.exports = NotificacionDAO;
