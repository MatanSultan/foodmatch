// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { con } from "../../lib/db";
import createtoken from "../../lib/token";

import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  const { email, password, username } = req.body;
  try {
    var data = await con
      .promise()
      .query(
        `select * from users where email = '${email}' or name = '${username}'`
      );
  } catch (error) {
    res.status(500).json({ error: "something wrong" });
    return;
  }

  if (data[0].length != 0) {
    res.status(404).json({ error: "User already exists" });
    return;
  }
  // create token
  const { token, tokenCreationDate } = createtoken();
  try {
    const datacheck = await con
      .promise()
      .query(
        `INSERT INTO users (name, email, password) VALUES ('${username}', '${email}', '${password}')`
      );
  } catch (error) {
    res.status(500).json({ error: "something wrong" });
    return;
  }

  const userID = datacheck[0].insertId;
  const data2 = await con
    .promise()
    .query(
      `INSERT INTO tokens (token, tokenCreationDate, userID) VALUES ('${token}', '${tokenCreationDate
        .toISOString()
        .substr(0, 19)
        .replace("T", " ")}', '${userID}')`
    );
  setCookie("SID", token, { req, res, maxAge: 60 * 60 * 24, httpOnly: true });
  setCookie("email", email, { req, res, maxAge: 60 * 60 * 24 });
  res.status(200).json({});
}
