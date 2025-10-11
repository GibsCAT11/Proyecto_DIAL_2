// test/dalTest.js
// DAL de prueba (in-memory) para tests sin conexión a MongoDB.
// Implementa las operaciones básicas usadas por los DAOs.
// Uso: const DalTest = require('./dalTest'); const dal = new DalTest();

class DalTest {
  constructor() {
    this.reset();
  }

  // Reinicia todo el "estado" (útil entre tests)
  reset() {
    this._nextClienteId = 1;
    this._nextPedidoId = 1;
    this._nextNotificacionId = 1;
    this._nextTiendaId = 1;
    this._nextProductoId = 1;

    this.clientes = []; // { _id, nombre, correo, carrito: { productos: [...] } }
    this.notificaciones = []; // { _id, id_cliente, mensaje, leida }
    this.pedidos = []; // { _id, id_cliente, items, estado, total, fecha }
    this.tiendas = []; // { _id (num), nombre, direccion, productos: [{ id_producto, nombre, stock, precio }], empleados: [] }
  }

  // Utilidades
  _clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  _genClienteId() { return 'c' + (this._nextClienteId++); }
  _genPedidoId() { return 'p' + (this._nextPedidoId++); }
  _genNotId() { return 'n' + (this._nextNotificacionId++); }
  _genTiendaId() { return this._nextTiendaId++; }
  _genProductoId() { return this._nextProductoId++; }

  // ----------------
  // Clientes
  // ----------------
  async crearCliente(clienteObj) {
    const cliente = this._clone(clienteObj);
    if (!cliente._id) cliente._id = this._genClienteId();
    if (!cliente.carrito) cliente.carrito = { fecha_creacion: new Date(), productos: [] };
    this.clientes.push(cliente);
    return this._clone(cliente);
  }

  async obtenerClientePorId(id) {
    const c = this.clientes.find(x => String(x._id) === String(id));
    return c ? this._clone(c) : null;
  }

  async obtenerClientePorCorreo(correo) {
    const c = this.clientes.find(x => x.correo === correo);
    return c ? this._clone(c) : null;
  }

  async actualizarCliente(id, cambios) {
    const idx = this.clientes.findIndex(x => String(x._id) === String(id));
    if (idx === -1) return null;
    this.clientes[idx] = Object.assign({}, this.clientes[idx], cambios);
    return this._clone(this.clientes[idx]);
  }

  async eliminarCliente(id) {
    const idx = this.clientes.findIndex(x => String(x._id) === String(id));
    if (idx === -1) return null;
    const removed = this.clientes.splice(idx, 1)[0];
    return this._clone(removed);
  }

  // Carrito
  async agregarProductoAlCarrito(idCliente, producto) {
    const cliente = this.clientes.find(x => String(x._id) === String(idCliente));
    if (!cliente) throw new Error('Cliente no encontrado');
    const prod = Object.assign({}, producto);
    if (!prod.id_producto) prod.id_producto = this._genProductoId();
    cliente.carrito.productos.push(prod);
    return this._clone(cliente.carrito);
  }

  async removerProductoCarrito(idCliente, idProducto) {
    const cliente = this.clientes.find(x => String(x._id) === String(idCliente));
    if (!cliente) throw new Error('Cliente no encontrado');
    cliente.carrito.productos = cliente.carrito.productos.filter(p => String(p.id_producto) !== String(idProducto));
    return this._clone(cliente.carrito);
  }

  async actualizarCantidadProductoCarrito(idCliente, idProducto, cantidad) {
    const cliente = this.clientes.find(x => String(x._id) === String(idCliente));
    if (!cliente) throw new Error('Cliente no encontrado');
    const p = cliente.carrito.productos.find(p => String(p.id_producto) === String(idProducto));
    if (!p) throw new Error('Producto no encontrado en el carrito');
    p.cantidad = cantidad;
    return this._clone(cliente.carrito);
  }

  async limpiarCarrito(idCliente) {
    const cliente = this.clientes.find(x => String(x._id) === String(idCliente));
    if (!cliente) throw new Error('Cliente no encontrado');
    cliente.carrito.productos = [];
    return this._clone(cliente.carrito);
  }

  async obtenerCarrito(idCliente) {
    const cliente = this.clientes.find(x => String(x._id) === String(idCliente));
    return cliente ? this._clone(cliente.carrito) : null;
  }

  // ----------------
  // Notificaciones
  // ----------------
  async crearNotificacion(notifObj) {
    const n = this._clone(notifObj);
    n._id = n._id || this._genNotId();
    n.leida = !!n.leida;
    this.notificaciones.push(n);
    return this._clone(n);
  }

  async obtenerNotificacionPorId(id) {
    const n = this.notificaciones.find(x => String(x._id) === String(id));
    return n ? this._clone(n) : null;
  }

  async obtenerNotificacionesPorCliente(idCliente) {
    return this._clone(this.notificaciones.filter(x => String(x.id_cliente) === String(idCliente)));
  }

  async marcarNotificacionComoLeida(id) {
    const idx = this.notificaciones.findIndex(x => String(x._id) === String(id));
    if (idx === -1) return null;
    this.notificaciones[idx].leida = true;
    return this._clone(this.notificaciones[idx]);
  }

  // ----------------
  // Pedidos
  // ----------------
  async crearPedido(pedidoObj) {
    const p = this._clone(pedidoObj);
    p._id = p._id || this._genPedidoId();
    p.fecha = p.fecha || new Date();
    p.estado = p.estado || 'pendiente';
    this.pedidos.push(p);
    return this._clone(p);
  }

  async obtenerPedidoPorId(id) {
    const p = this.pedidos.find(x => String(x._id) === String(id));
    return p ? this._clone(p) : null;
  }

  async obtenerTodosLosPedidos() {
    return this._clone(this.pedidos);
  }

  async actualizarPedido(id, cambios) {
    const idx = this.pedidos.findIndex(x => String(x._id) === String(id));
    if (idx === -1) return null;
    this.pedidos[idx] = Object.assign({}, this.pedidos[idx], cambios);
    return this._clone(this.pedidos[idx]);
  }

  async eliminarPedido(id) {
    const idx = this.pedidos.findIndex(x => String(x._id) === String(id));
    if (idx === -1) return null;
    const removed = this.pedidos.splice(idx, 1)[0];
    return this._clone(removed);
  }

  async actualizarEstadoPedido(id, nuevoEstado) {
    const idx = this.pedidos.findIndex(x => String(x._id) === String(id));
    if (idx === -1) return null;
    this.pedidos[idx].estado = nuevoEstado;
    return this._clone(this.pedidos[idx]);
  }

  // ----------------
  // Tiendas
  // ----------------
  async crearTienda(tiendaObj) {
    const t = this._clone(tiendaObj);
    t._id = typeof t._id !== 'undefined' ? t._id : this._genTiendaId();
    if (!t.productos) t.productos = [];
    if (!t.empleados) t.empleados = [];
    this.tiendas.push(t);
    return this._clone(t);
  }

  async obtenerTiendaPorId(id) {
    const t = this.tiendas.find(x => String(x._id) === String(id));
    return t ? this._clone(t) : null;
  }

  async obtenerTodasTiendas() {
    return this._clone(this.tiendas);
  }

  async agregarEmpleadoATienda(idTienda, empleado) {
    const t = this.tiendas.find(x => String(x._id) === String(idTienda));
    if (!t) throw new Error('Tienda no encontrada');
    t.empleados.push(this._clone(empleado));
    return this._clone(t);
  }

  async agregarProductoATienda(idTienda, producto) {
    const t = this.tiendas.find(x => String(x._id) === String(idTienda));
    if (!t) throw new Error('Tienda no encontrada');
    const prod = this._clone(producto);
    if (!prod.id_producto) prod.id_producto = this._genProductoId();
    if (typeof prod.stock === 'undefined') prod.stock = 0;
    t.productos.push(prod);
    return this._clone(t);
  }

  async actualizarStockProducto(idTienda, idProducto, nuevoStock) {
    const t = this.tiendas.find(x => String(x._id) === String(idTienda));
    if (!t) throw new Error('Tienda no encontrada');
    const p = t.productos.find(p => String(p.id_producto) === String(idProducto));
    if (!p) return null;
    p.stock = nuevoStock;
    return this._clone(t);
  }
}

module.exports = DalTest;
