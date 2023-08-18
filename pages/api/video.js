import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";

export default async function handler(req, res) {
  const { isLoggedIn, id } = await isLoggedInFunc(req, res);
  console.log(isLoggedIn, id);

  if (!isLoggedIn) {
    res.status(401).json({ error: "not logged in" });
    return;
  }

  console.log("Received Data:", req.body); // Logging received data

  try {
    const [result] = await con
      .promise()
      .query(
        "INSERT INTO videos (title, description, video_url, user_id) VALUES (?, ?, ?, ?)",
        [req.body.title, req.body.description, req.body.videoUrl, id]
      );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
