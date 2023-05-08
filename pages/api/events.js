import { con } from "../../lib/db";

export default function handler(req, res) {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT id, title, description, location, DATE_FORMAT(date, '%Y-%m-%d') AS date, TIME_FORMAT(time, '%H:%i:%s') AS time, created_at FROM events",
      function (err, result, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  })
    .then((result) => {
      if (result.length === 0) {
        res.status(200).json({ message: "No events found" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}
