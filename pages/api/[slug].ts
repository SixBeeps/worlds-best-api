import { NextApiRequest, NextApiResponse } from "next";
import { isKeyValid, keyOwnsToken, requestToken } from "../../util/api";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };

  if (!slug) {
    res.status(400).send("No key provided");
    return;
  } else {
    if (await isKeyValid(slug)) {
      if (!(await keyOwnsToken(slug))) {
        const token = await requestToken(slug);
        res.status(200).json(token);
      } else {
        res.status(401).send("Token already active for this key");
      }
    } else {
      res.status(401).send("Key is invalid");
    }
  }
};