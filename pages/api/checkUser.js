import { con } from "../../lib/db";

export default async function handler(req, res) {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const [rows] = await con
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    // Check if user exists and send a response back
    if (rows.length) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}
