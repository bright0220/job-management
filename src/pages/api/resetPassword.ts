import type { NextApiRequest, NextApiResponse } from "next";
import executeQuery from "~/lib/db";
const bcrypt = require("bcrypt");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    res.status(404).json({
      type: 404,
      message: "Not Found API",
    });

  const { email } = req.body;

  const generateRandomString = (length: number) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const new_password = generateRandomString(10);

  await executeQuery({
    query: "UPDATE users SET password = ? WHERE email = ?",
    values: [bcrypt.hashSync(new_password, 10), email],
  })
    .then(async (result) => {
      if (!result.changedRows) res.status(400).send("Not found email");
      else {
        const oauth2Client = new OAuth2(
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          "https://developers.google.com/oauthplayground"
        );
        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN,
        });
        const accessToken = await new Promise((resolve, reject) => {
          oauth2Client.getAccessToken((err: any, token: any) => {
            if (err) {
              reject("Failed to create access token :(");
            }
            resolve(token);
          });
        });
        console.log("access", accessToken);
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "jackfortin0220@gmail.com",
            accessToken: accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken:
              "1//04WbCWLgt_xTUCgYIARAAGAQSNwF-L9IrdMnENbgz70Wg2ur0ISAce4Km75APuWC78bA_L7i9PIcfb_VFKG4xg0_IIJfIwMmLFXk",
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        const message = `<p>Your password is changed to <b>${new_password}</b></p>`;

        await transport
          .sendMail({
            from: "jackfortin0220@gmail.com",
            to: email,
            subject: "Reset your Password",
            html: `<h4>Reset Password </h4>
              ${message}`,
          })
          .catch((err: any) => console.log("error", err));
        res.status(200).send("success");
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
}
