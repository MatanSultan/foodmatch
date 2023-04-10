// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { con } from "../../lib/db";
export default async function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
  //   const { title, description, image_url, user_id } = req.body;

  const data = await con.promise().query(`SELECT * FROM recipes `);
  console.log(data);
}
