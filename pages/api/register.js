// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { con } from "../../lib/db";
export default async function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
  const { email, password, username } = req.body;

  const data = await con
    .promise()
    .query(
      `INSERT INTO users (email, password, name) VALUES ('${email}', '${password}', '${username}')`
    );
  console.log(data);
}
