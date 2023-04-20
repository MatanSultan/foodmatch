import { isLoggedInFunc } from "../../lib/authHelpers";
import { con } from "../../lib/db";

export default async function handler(req, res) {
  const auth = await isLoggedInFunc(req, res);
  if (!auth.isLoggedIn) {
    return res.status(auth.code).json({ error: auth.error });
  }

  if (req.method === "GET") {
    try {
      const userID = auth.user.id;
  
      // Query the database to get the user's liked recipes
      const [likedRecipesRows] = await con
        .promise()
        .query(
          "SELECT r.id, r.title, r.image_url, r.description FROM recipes r JOIN likes l ON r.id = l.recipeID WHERE l.userID = ?",
          userID
        );
  
      // Set the recipes variable to the user's liked recipes
      const recipes = [...likedRecipesRows];
  
      // Query the database to get some recommended recipes
      // const [recommendedRecipesRows] = await con
      //   .promise()
      //   .query(
      //     "SELECT r.id, r.title, r.image_url, r.description FROM recipes r ORDER BY likes "
      //   );
  
      // Combine the user's liked recipes and the recommended recipes
      // const recipes = [...likedRecipesRows, ...recommendedRecipesRows];
  
      // Return the combined recipes
      return res.status(200).json({ likedRecipes: recipes });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch recipes" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
}