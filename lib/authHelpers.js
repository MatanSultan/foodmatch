import { getCookie } from "cookies-next";
import { con } from "../lib/db";

export async function isLoggedInFunc(req, res) {
  // step 1: get email from the 'user' cookie

  try {
    var email = getCookie("email", { req, res });
  } catch (error) {
    console.log(`error`, error);
    return {
      isLoggedIn: false,
      error: `couldn't get email from cookie`,
      code: 401,
      isAdmin: false,
      db: null,
    };
  }

  // step 2: get token from the 'token' cookie
  let token = null;
  try {
    token = getCookie("SID", { req, res });
  } catch (error) {
    console.log(`error`, error);
    return {
      isLoggedIn: false,
      error: `couldn't get token from cookie`,
      code: 401,
      isAdmin: false,
      db: null,
    };
  }

  // step 3: fetch db and check if the user has this token
  try {
    const [users] = await con
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return {
        isLoggedIn: false,
        error: `user with this email doesn't exist`,
        code: 401,
        isAdmin: false,
        db: null,
      };
    }

    if (users.length > 1) {
      // shouldn't ever reach here

      return {
        isLoggedIn: false,
        error: "no information about this error due to Information security",
        code: 500,
        isAdmin: false,
        db: null,
      };
    }

    const user = users[0];
    const [tokens] = await con
      .promise()
      .query("SELECT * FROM tokens WHERE userID = ? AND token = ?", [
        user.id,
        token,
      ]);
    const tokenFromDb = tokens[0];

    if (!tokenFromDb) {
      return {
        isLoggedIn: false,
        error: `token is not valid`,
        code: 401,
        // isAdmin: false,
        db: null,
      };
    }

    return {
      isLoggedIn: true,
      id: user.id,
      error: null,
      code: null,
      // isAdmin: true,
      db: con,
      user,
    };
  } catch (err) {
    return {
      isLoggedIn: false,
      error: `failed to connect to DB: ${err}`,
      code: 503,
      // isAdmin: false,
      db: null,
    };
  }
}
