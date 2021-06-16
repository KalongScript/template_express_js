const express = require("express");
const router = express.Router();

const booksRouter = require("./books");
const authRouter = require("./auth");

router.use("/books", booksRouter);
router.use("/auth", authRouter);

router.get("/", (req, res, next) => {
  res.send("Welcome to the api");
});

module.exports = router;
