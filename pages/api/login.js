import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { setCookie } from "cookies-next";
import bcrypt from "bcrypt";
import crypto from "crypto";

import { OAuth2Client } from "google-auth-library";
async function getUserFromGoogleToken(token) {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const email = payload.email;

  return { email };
}

export default async function handler(req, res) {
  const { email, password } = req.body;
  async function getUserFromGoogleToken(token) {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    // כאן אתה יכול להוסיף עוד פרטים של המשתמש מתוך ה-payload
    return { email };
  }

  const [rows] = await con
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length === 0) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  //validatetion
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password too short" });
  }

  //email validation
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const user = rows[0];
  const userId = user.id;
  const hashedPassword = user.password;

  try {
    const passwordMatch = await crypto.timingSafeEqual(
      Buffer.from(await bcrypt.hash(password, user.salt), "utf8"),
      Buffer.from(hashedPassword, "utf8")
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
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

  setCookie("SID", token, { req, res, httpOnly: true, signed: true });
  setCookie("email", email, { req, res, signed: true });

  res.status(200).json({});
}
