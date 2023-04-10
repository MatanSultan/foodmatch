const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const pool = new sql.ConnectionPool(config);

const getConnection = async () => {
  try {
    await pool.connect();
    console.log("Database connected-------------------");
    return pool;
  } catch (err) {
    console.error("Database connection failed: ---------", err.message);
    return null;
  }
};

module.exports = {
  sql,
  getConnection,
};
