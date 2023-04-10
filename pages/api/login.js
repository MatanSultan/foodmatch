import { con } from "../../lib/db";
export default async function handler(req, res) {
  const { email, password } = req.body;
  const data = await con
    .promise()
    .query(
      `select * from users where email = '${email}' and password = '${password}'`
    );

  console.log(data);
  res.status(200).json({ name: "John Doe" });
}
