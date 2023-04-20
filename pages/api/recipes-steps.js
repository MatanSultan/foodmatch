import { con } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { recipe_id } = req.query;

      // get the recipe steps from the recipes table
      const [rows] = await con.promise().query(
        "SELECT steps FROM recipes WHERE id = ?",
        recipe_id
      );

      // return the recipe steps
      res.status(200).json(rows[0].steps);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
