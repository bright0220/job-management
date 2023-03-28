import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "~/lib/db";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    res.status(404).json({
      type: 404,
      message: "Not Found API",
    });

  const { email, password } = req.body;

  let err_status = "";

  await executeQuery({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  })
    .then((result) => {
      if (result.length && bcrypt.compareSync(password, result[0].password)) {
        if (result[0].isActive === 0) {
          res
            .status(401)
            .json({ message: "Pending Account. Please Verify Your Email!" });
          err_status = "pending";
          return;
        }

        const token = jwt.sign(
          { user_id: result[0].id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        res.status(200).json({
          ...result[0],
          token,
        });
      } else if (err_status !== "pending")
        res.status(400).send("Invalid Credentials");
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
