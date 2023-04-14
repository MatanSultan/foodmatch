import { con } from "../../lib/db";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM recipes", function (err, result, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}
