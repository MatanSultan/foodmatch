import { deleteCookie } from "cookies-next";
export default async function handler(req, res) {
  deleteCookie("SID", { req, res });
  deleteCookie("email", { req, res });
  res.status(200).json({});
}
