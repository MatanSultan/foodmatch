const sql = require("mssql"); //mssql is a node.js driver for SQL Server that is written in JavaScript and compiles to native JavaScript. It is a pure JavaScript implementation with no dependencies. It is a pure JavaScript implementation with no dependencies.
const dotenv = require("dotenv"); //dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

dotenv.config(); //config() will read your .env file, parse the contents, assign it to process.env.

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
//ConnectionPool is a class that represents a pool of connections to a database. It is used to create and manage a pool of connections to a database.

const getConnection = async () => {
  //getConnection is an async function that returns a promise.
  // It will try to connect to the database and return the pool if successful.
  // If it fails, it will return null.
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
