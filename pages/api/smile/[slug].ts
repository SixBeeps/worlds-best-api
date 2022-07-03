import { NextApiRequest, NextApiResponse } from "next";
import { isTokenActive, redeemToken } from "../../../util/api";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query as { slug: string };

  if (!slug) {
    res.status(400).send("No token provided");
    return;
  } else {
    if (isTokenActive(slug)) {
		if (await redeemToken(slug)) {
			res.status(200).send(":)");
		} else {
			res.status(500).send(":( I have no idea what happened here.");
		}
	} else {
		res.status(401).send("Token is either used, expired, or never existed");
	}
  }
};