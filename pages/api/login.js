// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { con } from "../../lib/db";
export default async function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
  const { email, password } = req.body;

  const data = await con
    .promise()
    .query(
      `SELECT from users (email, password) VALUES ('${email}', '${password}')`
    );
  console.log(data);
}
