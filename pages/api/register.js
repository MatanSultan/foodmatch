import { set } from "mongoose";
import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import bcrypt from "bcrypt";

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

    //validatetion
    if (!email || !password || !username) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password too short" });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: "Username too short" });
    }

    //email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { token, tokenCreationDate } = createtoken();
    const userResult = await con
      .promise()
      .query(
        "INSERT INTO users (name, email, password, salt) VALUES (?, ?, ?, ?)",
        [username, email, hashedPassword, salt]
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
    setCookie("email", email, { req, res, maxAge: 60 * 60 * 24 });
    setCookie("username", username, { req, res, maxAge: 60 * 60 * 24 });
    setCookie("userId", userId, { req, res, maxAge: 60 * 60 * 24 });

    return res.status(201).json({});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
