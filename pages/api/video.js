import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";
export default async function handler(req, res) {
  req.body = JSON.parse(req.body);
  const { isLoggedIn, id } = await isLoggedInFunc(req, res);
  if (!isLoggedIn) {
    res.status(401).json({ error: "not logged in" });
    return;
  }

  const [result] = await con
    .promise()
    .query(
      "INSERT INTO videos (title, description, video_url,user_id) VALUES (?, ?, ?, ?)",
      [req.body.title, req.body.description, req.body.videoUrl, id]
    );

  res.status(201).json({ id: result.insertId });
}
