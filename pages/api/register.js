import { set } from "mongoose";
import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  const { email, password, username } = req.body;

  try {
    const result = await con
      .promise()
      .query("SELECT * FROM users WHERE email = ? OR name = ?", [
        email,
        username,
      ]);

    if (result[0].length !== 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const { token, tokenCreationDate } = createtoken();
    const userResult = await con
      .promise()
      .query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
        username,
        email,
        password,
      ]);

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
    setCookie("email", email, { req, res, maxAge: 60 * 60 * 24 });
    setCookie("username", username, { req, res, maxAge: 60 * 60 * 24 });
    setCookie("userId", userId, { req, res, maxAge: 60 * 60 * 24 });

    return res.status(201).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
