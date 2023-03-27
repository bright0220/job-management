import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "~/lib/db";

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
// type signUpData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  transport
    .sendMail({
      from: "jackfortin0220@gmail.com",
      to: "webdev.0220@gmail.com",
      subject: "Please confirm your account",
      html: "Hello!",
    })
    .catch((err: any) => console.log("error", err));
  // if (req.method !== "POST")
  //   res.status(404).json({
  //     type: 404,
  //     message: "Not Found API",
  //   });
  // const { firstName, lastName, email, password } = req.body;
  // if (!(firstName && lastName && email && password)) {
  //   res.status(400).send("All input is required");
  // }
  // await executeQuery({
  //   query: "SELECT * FROM users WHERE email = ?",
  //   values: [email],
  // })
  //   .then(async (result) => {
  //     if (result.length === 0)
  //       await executeQuery({
  //         query:
  //           "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
  //         values: [firstName, lastName, email, bcrypt.hashSync(password, 10)],
  //       })
  //         .then((result) => {
  //           res.status(200).json(result);
  //         })
  //         .catch((error) => {
  //           res.status(500).json(error);
  //         });
  //     else res.status(409).send("User Already Exist. Please Login");
  //   })
  //   .catch((error) => {
  //     res.status(500).json(error);
  //   });
}
