import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();
const connection = mysql.createConnection(process.env.DATABASE_URL);

console.log("Connected to the database!");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server!");
});
export const con = connection;
