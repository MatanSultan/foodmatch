// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { con } from "../../lib/db";
import createtoken from "../../lib/token";
import { setCookie } from "cookies-next";
export default async function handler(req, res) {
  const { email, password } = req.body;

  const data = await con
    .promise()
    .query(`SELECT * from users where email = '${email}'`);
  console.log(data);
  if (data[0].length == 0) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  // check email
  if (data[0][0].email != email) {
    res.status(401).json({ error: "Email is incorrect" });
    return;
  }
  // check password

  if (data[0][0].password != password) {
    res.status(401).json({ error: "Password is incorrect" });
    return;
  }
  // validation EMAIL CHEACK REGULAR EXPRESSION
  const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email.match(emailRegEx)) {
    res.status(400).json({ error: "Email is not valid" });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters" });
    return;
  }

  // create token
  const { token, tokenCreationDate } = createtoken();
  const userID = data[0][0].id;
  await con
    .promise()
    .query(
      `INSERT INTO tokens (token, tokenCreationDate, userID) VALUES ('${token}', '${tokenCreationDate
        .toISOString()
        .substr(0, 19)
        .replace("T", " ")}', '${userID}')`
    );
  setCookie("SID", token, { req, res, maxAge: 60 * 60 * 24, httpOnly: true });
  setCookie("email", email, { req, res, maxAge: 60 * 60 * 24 });
  res.status(200).json({ email: email });
}
