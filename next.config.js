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
  },
};

module.exports = nextConfig;
