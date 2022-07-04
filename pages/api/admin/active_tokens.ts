import { NextApiRequest, NextApiResponse } from "next";
import { isAdminKey, getActiveTokens } from "../../../util/api";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { admin_key } = req.query as { admin_key: string };

  if (!admin_key) {
    res.status(400).send("No admin key provided");
    return;
  } else {
    if (await isAdminKey(admin_key)) {
      res.status(200).send(getActiveTokens().join("\n") || "No active tokens");
    } else {
      res.status(403).send("Admin key is invalid");
    }
  }
};