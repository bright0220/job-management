import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "~/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { confirmationCode } = req.query;
  await executeQuery({
    query: "UPDATE users SET isActive = 1 WHERE confirmToken = ?",
    values: [confirmationCode],
  }).then((result) => {
    if (result.changedRows === 0)
      res.status(404).json({ message: "User Not found." });
    else res.status(200).send("Welcome! Your email is verified.");
  });
}
