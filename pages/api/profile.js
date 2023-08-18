import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";

export default async function handler(req, res) {
  try {
    const auth = await isLoggedInFunc(req, res);

    if (!auth.isLoggedIn) {
      return res.status(401).json({ error: "User is not logged in." });
    }

    if (req.method === "PUT") {
      const { name, email } = req.body;

      if (!name && !email) {
        return res
          .status(400)
          .json({ error: "Name and/or email is required." });
      }

      // Update the user details in the database
      let query = "UPDATE users SET";
      const queryParams = [];
      if (name) {
        query += " name=?,";
        queryParams.push(name);
      }
      if (email) {
        query += " email=?,";
        queryParams.push(email);
      }
      query = query.slice(0, -1);
      query += " WHERE id=?";
      queryParams.push(auth.id);

      const [result] = await con.promise().query(query, queryParams);

      if (result.affectedRows !== 1) {
        throw new Error("User details not updated.");
      }

      const [updatedUser] = await con
        .promise()
        .query("SELECT * FROM users WHERE id = ?", [auth.id]);

      if (!updatedUser) {
        throw new Error("User details not found after update.");
      }

      res.status(200).json(updatedUser[0]);
    } else if (req.method === "GET") {
      const [result] = await con
        .promise()
        .query("SELECT * FROM users WHERE id = ?", [auth.id]);

      if (!result || result.length === 0) {
        throw new Error("User details not found.");
      }

      // Assuming logout() function is defined somewhere in your authHelpers
      // logout(req, res);

      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
