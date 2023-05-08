import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";

export default async function handler(req, res) {
  const auth = await isLoggedInFunc(req, res);

  // get the email of the user that post that recipe

  try {
    var [result] = await con.promise().query(
      auth.isLoggedIn
        ? `SELECT r.id, r.title, r.description, r.image_url, u.name AS username, r.likes, r.steps, CASE WHEN l.userID IS NULL THEN 0 ELSE 1 END AS didLike 
        FROM recipes r 
        LEFT JOIN likes l ON r.id = l.recipeID AND l.userID = ${auth.id} 
        LEFT JOIN users u ON r.user_id = u.id
           `
        : "SELECT * FROM recipes"
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
  // console.log(result);
  res.status(200).json(result);
}
