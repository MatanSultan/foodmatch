import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";

export default async function handler(req, res) {
  try {
    const auth = await isLoggedInFunc(req, res);

    if (!auth.isLoggedIn) {
      throw new Error("User is not logged in.");
    }

    if (req.method === "PUT") {
      const { name, email } = req.body;

      if (!name && !email) {
        throw new Error("Name and/or email is required.");
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
      query = query.slice(0, -1); // Remove trailing comma
      query += " WHERE id=?";
      queryParams.push(auth.id);

      const [result] = await con.promise().query(query, queryParams);

      if (result.affectedRows !== 1) {
        throw new Error("User details not updated.");
      }

      // Fetch the updated user details from the database
      const [updatedUser] = await con
        .promise()
        .query(`SELECT * FROM users WHERE id = ${auth.id}`);

      if (!updatedUser) {
        throw new Error("User details not found.");
      }

      // Send the updated user details as response
      res.status(200).json(updatedUser);
    } else if (req.method === "GET") {
      const [result] = await con
        .promise()
        .query(`SELECT * FROM users WHERE id = ${auth.id}`);

      if (!result) {
        throw new Error("User details not found.");
      }
      // do log out
      // logout(req, res);

      res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
