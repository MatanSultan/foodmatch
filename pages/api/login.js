import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { setCookie } from "cookies-next";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID =
  "979802220869-hbc0lm3b8n4kl19hbt4r158knn5bqb9p.apps.googleusercontent.com";

async function getUserFromGoogleToken(token) {
  const client = new OAuth2Client(GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return { email: payload.email };
}

export default async function handler(req, res) {
  let email = req.body.email;
  const { password, googleToken } = req.body;

  // Google Sign-In
  if (googleToken) {
    try {
      const googleUser = await getUserFromGoogleToken(googleToken);
      email = googleUser.email;
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Invalid Google token" });
    }
  }

  const [rows] = await con
    .promise()
    .query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length === 0) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // If this is not a Google Sign-In request, validate the password
  if (!googleToken) {
    const user = rows[0];
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
  }

  const { token, tokenCreationDate } = createtoken();

  await con
    .promise()
    .query(
      "INSERT INTO tokens (token, tokenCreationDate, userID) VALUES (?, ?, ?)",
      [
        token,
        tokenCreationDate.toISOString().substr(0, 19).replace("T", " "),
        rows[0].id,
      ]
    );

  setCookie("SID", token, { req, res, httpOnly: true, signed: true });
  setCookie("email", email, { req, res, signed: true });

  res.status(200).json({});
}
