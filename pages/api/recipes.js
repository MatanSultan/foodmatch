import { con } from "../../lib/db";

export default function handler(req, res) {
  const sql = "SELECT * FROM recipes";

  con.query(sql, function (error, results) {
    if (error) throw error;
    res.status(200).json(results);
  });
}
