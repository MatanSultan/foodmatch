import { getServerSession } from "next-auth/next";
import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  const session = await getServerSession({ req });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { title, description, image_url, steps } = req.body;
  if (!title || !description || !image_url || !steps) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  try {
    const { token, tokenCreationDate } = createtoken();
    const [userData] = await con
      .promise()
      .query(`SELECT user_id FROM users WHERE email = ?`, [session.user.email]);
    const user_id = userData[0].user_id;
    const data = await con
      .promise()
      .query(
        `INSERT INTO recipes (title, description, image_url, user_id, steps) VALUES (?, ?, ?, ?, ?)`,
        [title, description, image_url, user_id, steps]
      );

    const recipeID = data[0].insertId;
    const data2 = await con
      .promise()
      .query(
        `INSERT INTO tokens (token, tokenCreationDate, recipeID) VALUES (?, ?, ?)`,
        [
          token,
          tokenCreationDate.toISOString().substr(0, 19).replace("T", " "),
          recipeID,
        ]
      );
    setCookie("SID", token, { res, maxAge: 60 * 60 * 24, httpOnly: true });
    res.status(200).json({});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
