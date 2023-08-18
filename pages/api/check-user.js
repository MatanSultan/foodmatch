import { con } from "../../lib/db";

export default async function handler(req, res) {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const [rows] = await con
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email]);

  const checkUser = await axios.get(`/api/checkUser/${uid}`);
  if (checkUser.status === 200) {
    if (checkUser.data.exists) {
    }
  } else {
    throw new Error("User not found or some other error.");
  }

  return res.status(200).json({ exists: true });
}
