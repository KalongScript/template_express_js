const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secretToken = config.secret_token;

const login = async (request) => {
  const password = helper.ecryptSHA256(request.password);
  const rows = await db.query(
    "select * from users where email=? and password=?",
    [request.email, password]
  );
  if (rows) {
    const token = generateToken(rows);
    return {
      message: "Login success",
      token,
    };
  }
  return {
    message: "Login failed",
  };
};

const register = async (request) => {
  const checkEmail = await db.query(`select * from users where email=?`, [
    request.email,
  ]);
  if (checkEmail.length) {
    return {
      message: "Email already taken",
    };
  }
  const password = helper.ecryptSHA256(request.password);
  const resultInsert = await db.query(
    `insert into users(email, password, name) values (?,?,?)`,
    [request.email, password, request.name]
  );
  if (!resultInsert.affectedRows) {
    return {
      message: "Register failed",
    };
  }
  const token = generateToken(resultInsert);
  return {
    message: "Register success",
    token,
  };
};

const generateToken = (user) => {
  return jwt.sign({ data: user }, secretToken, { expiresIn: "24h" });
};

module.exports = {
  login,
  register,
};
