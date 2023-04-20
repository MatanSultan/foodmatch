import { con } from "../../lib/db";
import { isLoggedInFunc } from "../../lib/authHelpers";

export default async function handler(req, res) {
  try {
    const auth = await isLoggedInFunc(req, res);

    if (!auth.isLoggedIn) {
      throw new Error("User is not logged in.");
    }
    // console.log(auth.id);
    const [result] = await con
      .promise()
      .query(`SELECT * FROM users WHERE id = ${auth.id}`);

    if (!result) {
      throw new Error("User details not found.");
    }
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
