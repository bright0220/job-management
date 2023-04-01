import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "~/lib/db";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    res.status(404).json({
      type: 404,
      message: "Not Found API",
    });
  const { firstName, lastName, email, password } = req.body;
  if (!(firstName && lastName && email && password)) {
    res.status(400).send("All input is required");
  }

  const token = jwt.sign({ email: email }, process.env.TOKEN_KEY);

  await executeQuery({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  })
    .then(async (result) => {
      if (result.length === 0)
        await executeQuery({
          query:
            "INSERT INTO users (firstName, lastName, email, password, confirmToken) VALUES (?, ?, ?, ?, ?)",
          values: [
            firstName,
            lastName,
            email,
            bcrypt.hashSync(password, 10),
            token,
          ],
        })
          .then((result) => {
            fetch("http://localhost:3000/api/sendVerify", {
              method: "POST",
              body: JSON.stringify({
                email,
                firstName,
                token,
              }),
            }).catch((e) => console.log);
            res
              .status(200)
              .send("SignUp is success! Please confirm your email.");
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      else res.status(409).send("User Already Exist. Please Login");
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
