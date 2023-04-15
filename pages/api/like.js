import { con } from "../../lib/db";

export default async function handler(req, res) {
  const { recipeID } = req.body;
  console.log(({ userID } = req.session));

  // Insert a new like into the database
  await con
    .promise()
    .execute("INSERT INTO likes (recipeID, userID) VALUES (?, ?)", [
      recipeID,
      userID,
    ]);

  // Increment the likes count for the recipe in the recipes table
  await con
    .promise()
    .execute("UPDATE recipes SET likes = likes + 1 WHERE id = ?", [recipeID]);

  res.status(200).json({ success: true });
}
