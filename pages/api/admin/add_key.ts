import { NextApiRequest, NextApiResponse } from "next";
import { isAdminKey, registerKey } from "../../../util/api";
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { admin_key, new_key } = req.query as { admin_key: string, new_key: string };

  if (!admin_key) {
    res.status(400).send("No admin key provided");
    return;
  } else {
    if (await isAdminKey(admin_key)) {
      const okay = await registerKey(new_key);
	  if (okay === undefined) {
		res.status(200).send(`Key ${new_key} registered!`);
	  } else {
		res.status(400).send("Uh oh, the key doesn't want to be registered.");
	  }
    } else {
      res.status(403).send("Admin key is invalid");
    }
  }
};