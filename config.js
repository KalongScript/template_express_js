require("dotenv").config();
const env = process.env;

const config = {
  db: {
    host: env.DB_HOST || "localhost",
    user: env.DB_USER || "admin",
    password: env.DB_PASSWORD || "admin",
    database: env.DB_NAME || "express_rest_api",
  },
  secret_token: "eheheheh",
};

module.exports = config;
