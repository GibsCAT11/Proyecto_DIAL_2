import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const {
  MYSQL_HOST = 'localhost',
  MYSQL_USER = 'root',
  MYSQL_PASSWORD = 'root',
  MYSQL_DATABASE = 'mi_proyecto_dal',
  MYSQL_PORT = 3306
} = process.env;

class DBConnection {
  static async connect() {
    if (this.connection) return this.connection;
    try {
      this.connection = await createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        port: MYSQL_PORT
      });
      console.log('MySQL conectado');
      return this.connection;
    } catch (err) {
      console.error('Error al conectar MySQL:', err);
      throw err;
    }
  }

  static async disconnect() {
    if (!this.connection) return;
    await this.connection.end();
    this.connection = null;
    console.log('Conexión MySQL cerrada');
  }
}

export default DBConnection;
