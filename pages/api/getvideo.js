import { con } from "../../lib/db";

export default async function handler(req, res) {
  const [result] = await con.promise().query("SELECT * FROM videos");

  res.status(200).json(result);
}
