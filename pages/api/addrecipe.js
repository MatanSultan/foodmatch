import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";
export default async function handler(req, res) {
  const { title, description, imageUrl, steps } = req.body;

  const auth = await isLoggedInFunc(req, res);
  if (!auth.isLoggedIn) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  if (!title || !description || !imageUrl || !steps) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  try {
    const data = await con
      .promise()
      .query(
        "INSERT INTO recipes (title, description, image_url, user_id, likes, steps) VALUES (?, ?, ?, ?, ?, ?)",
        [title, description, imageUrl, 1, 0, JSON.stringify(steps)]
      );
    res.status(200).json({ message: "Recipe added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
