// src/db/connection.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mi_proyecto_dal';

class DBConnection {
  static async connect() {
    if (this.connection) return this.connection;
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.connection = mongoose.connection;
      console.log('✅ MongoDB conectado');
      return this.connection;
    } catch (err) {
      console.error('❌ Error al conectar MongoDB', err);
      throw err;
    }
  }

  static async disconnect() {
    if (!this.connection) return;
    await mongoose.disconnect();
    this.connection = null;
  }
}

module.exports = DBConnection;
