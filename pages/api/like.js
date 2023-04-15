import { withIronSession } from "next-iron-session";
import { con } from "../../lib/db";

async function handler(req, res) {
  const { recipeID } = req.body;
  const userID = req.session.get("userID");

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

export default withIronSession(handler, {
  password: "some_password_that_is_at_least_32_characters_long",
  cookieName: "my_session_cookie_name",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
