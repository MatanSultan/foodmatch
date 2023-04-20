import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";

export default async function handler(req, res) {
  const { recipeID } = req.body;

  // Check if the user is logged in
  const { isLoggedIn, error, user } = await isLoggedInFunc(req, res);
  if (!isLoggedIn) {
    return res.status(401).json({ message: "you are not logged in." });
  }

  try {
    // Check if user has already liked the recipe
    const [rows] = await con
      .promise()
      .query("SELECT * FROM likes WHERE userID = ? AND recipeID = ?", [
        user.id,
        recipeID,
      ]);

    if (rows.length > 0) {
      // Delete the like from the likes table
      const deleteQuery = "DELETE FROM likes WHERE userID = ? AND recipeID = ?";
      await con.promise().query(deleteQuery, [user.id, recipeID]);

      // Update the likes in the recipes table
      const updateQuery = "UPDATE recipes SET likes = likes - 1 WHERE id = ?";
      const [updateResult] = await con.promise().query(updateQuery, recipeID);

      // Return success message with updated likes count
      return res.status(200).json({
        message: "Recipe like removed successfully",
        likes: updateResult.affectedRows,
      });
    }

    // Update the likes in the recipes table
    const updateQuery = "UPDATE recipes SET likes = likes + 1 WHERE id = ?";
    const [updateResult] = await con.promise().query(updateQuery, recipeID);

    // Insert the like in the likes table
    const insertQuery = "INSERT INTO likes (userID, recipeID) VALUES (?, ?)";
    const [insertResult] = await con
      .promise()
      .query(insertQuery, [user.id, recipeID]);

    // Return success message with updated likes count
    return res.status(200).json({
      message: "Recipe liked successfully",
      likes: updateResult.affectedRows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
}
