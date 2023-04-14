import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { setCookie } from "cookies-next";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;

  const [rows] = await con
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length === 0) {
    return res.status(404).json({
      error: "The email address you entered does not belong to any account",
    });
  }
  const userId = rows[0].id;

  try {
    if (userId.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }

  const { token, tokenCreationDate } = createtoken();

  await con
    .promise()
    .query(
      "INSERT INTO tokens (token, tokenCreationDate, userID) VALUES (?, ?, ?)",
      [
        token,
        tokenCreationDate.toISOString().substr(0, 19).replace("T", " "),
        userId,
      ]
    );

  setCookie("SID", token, { req, res, httpOnly: true });
  setCookie("email", email, { req, res });

  res.status(200).json({ email: email });
}
