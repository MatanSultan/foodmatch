import { con } from "../../lib/db";

export default function handler(req, res) {
  con.query("SELECT * FROM recipes", function (err, result, fields) {
    if (err) throw err;
    res.status(200).json(result);
  });
}
