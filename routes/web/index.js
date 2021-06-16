const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { owner: "Orang bego" });
});

module.exports = router;
