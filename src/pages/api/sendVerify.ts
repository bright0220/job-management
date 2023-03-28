import type { NextApiRequest, NextApiResponse } from "next";

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

  const { email, firstName, token } = JSON.parse(req.body);

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

  await transport
    .sendMail({
      from: "jackfortin0220@gmail.com",
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${firstName}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/api/confirm/${token}> Click here</a>
        </div>`,
    })
    .catch((err: any) => console.log("error", err));
}
