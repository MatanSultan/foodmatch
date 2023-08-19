import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password, username, google_id, google_email, google_name } =
    req.body;
  //validatetion
  if ((!email || !password || !username) && !google_id) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!google_id && password.length < 6) {
    return res.status(400).json({ error: "Password too short" });
  }

  if (username.length < 3) {
    return res.status(400).json({ error: "Username too short" });
  }

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!google_id && !emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  try {
    const result = await con
      .promise()
      .query(
        "SELECT * FROM users WHERE email = ? OR name = ? OR google_email = ? OR google_id = ?",
        [email, username, google_email, google_id]
      );

    if (result[0].length !== 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    let hashedPassword;
    let salt;

    if (!google_id) {
      salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const { token, tokenCreationDate } = createtoken();

    const userFields = google_id
      ? [
          username,
          email,
          null,
          null,
          google_id,
          google_email,
          google_name,
          true,
        ]
      : [username, email, hashedPassword, salt, null, null, null, false];

    const userResult = await con
      .promise()
      .query(
        "INSERT INTO users (name, email, password, salt, google_id, google_email, google_name, connected_with_google) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        userFields
      );

    const userId = userResult[0].insertId;

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

    setCookie("SID", token, { req, res, maxAge: 60 * 60 * 24, httpOnly: true });

    if (!google_id) {
      setCookie("email", email, { req, res, maxAge: 60 * 60 * 24 });
    }

    setCookie("username", username, { req, res, maxAge: 60 * 60 * 24 });
    setCookie("userId", userId, { req, res, maxAge: 60 * 60 * 24 });

    return res.status(201).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
