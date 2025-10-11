// src/entities/TiendaEntity.js
class TiendaEntity {
  constructor({ _id, nombre, direccion, telefono, horario, empleados = [], productos = [] }) {
    this._id = _id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.horario = horario;
    this.empleados = empleados;
    this.productos = productos;
  }
}

module.exports = TiendaEntity;
