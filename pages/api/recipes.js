import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";

export default async function handler(req, res) {
  const auth = await isLoggedInFunc(req, res);

  // get the email of the user that post that recipe

  try {
    var [result] = await con
      .promise()
      .query(
        auth.isLoggedIn
          ? `SELECT r.id, r.title, r.description, r.image_url, r.user_id, r.likes, r.steps, CASE WHEN l.userID IS NULL THEN 0 ELSE 1 END AS didLike FROM recipes r LEFT JOIN likes l ON r.id = l.recipeID AND l.userID = ${auth.id}`
          : "SELECT * FROM recipes"
      );
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
  // const newResult = result.map((recipe) => {
  //   return {
  //     id: recipe.id,
  //     title: recipe.title,
  //     description: recipe.description,
  //     imageUrl: recipe.image_url,
  //     likes: recipe.likes,
  //     steps: JSON.parse(recipe.steps),
  //     didLike: false,
  //   };
  // });
  res.status(200).json(result);
}
