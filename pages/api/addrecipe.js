import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";

export default async function handler(req, res) {
  const { title, description, image_url, user_id } = req.body;
  if (!title || !description || !image_url || !user_id) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }
  const { token, tokenCreationDate } = createtoken();
  try {
    const data = await con
      .promise()
      .query(
        `INSERT INTO recipes (title, description, image_url, user_id) VALUES ('${title}', '${description}', '${image_url}', '${user_id}')`
      );
  } catch (error) {
    res.status(500).json({ error: "something wrong" });
    return;
  }

  const userID = data[0].insertId;
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
