/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MYSQL_HOST: "127.0.0.1",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "job",
    MYSQL_USER: "root",
    MYSQL_PASSWROD: "",
    TOKEN_KEY: "jack_duc",
    GMAIL_USER: "jackfortin0220@gmail.com",
    GMAIL_PASS: "senko438",
    CLIENT_ID:
      "458272222003-fejk2ov59n1qn2fskbd0j1usqunhtud3.apps.googleusercontent.com",
    CLIENT_SECRET: "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",
    REFRESH_TOKEN:
      "1//04WbCWLgt_xTUCgYIARAAGAQSNwF-L9IrdMnENbgz70Wg2ur0ISAce4Km75APuWC78bA_L7i9PIcfb_VFKG4xg0_IIJfIwMmLFXk",
  },
};

module.exports = nextConfig;
