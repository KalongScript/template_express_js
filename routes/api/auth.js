const express = require("express");
const router = express.Router();
const auth = require("../../services/auth");
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  body("email")
    .exists()
    .withMessage("email field required")
    .isEmail()
    .withMessage("email field must be and email"),
  body("password").exists().withMessage("password field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      res.json(await auth.login(req.body));
    } catch (error) {
      console.error(`Error logging in `, error.message);
      next(error);
    }
  }
);

router.post(
  "/register",
  body("email")
    .exists()
    .withMessage("email field required")
    .isEmail()
    .withMessage("email field must be and email"),
  body("password").exists().withMessage("password field required"),
  body("name").exists().withMessage("name field required"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      res.json(await auth.register(req.body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
