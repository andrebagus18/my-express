const express = require("express");
const router = express.Router();

const {
  create,
  login,
  verifyEmail,
} = require("../controllers/user.controller.js");

router.post("/register", create);
router.post("/login", login);
router.get("/verifikasi-email", verifyEmail);

module.exports = router;
