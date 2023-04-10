import { con } from "../../lib/db";
export default async function handler(req, res) {
  const { title, description, image_url, user_id } = req.body;
  const data = await con
    .promise()
    .query(
      `INSERT INTO recipes (title, description,image_url,user_id) VALUES ('${title}', '${description}', '${image_url}', '${user_id}')`
    );
  console.log(data);
  res.status(200).json({ name: "upload-recipe" });
}
