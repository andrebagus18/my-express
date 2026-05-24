const express = require("express");
const router = express.Router();

const {
  create,
  getAllData,
  getById,
  updateData,
  deleted,
} = require("../controllers/course.controller.js");
const { verifyToken } = require("../middlewares/auth-middleware.js");

router.post("/", verifyToken, create);
router.get("/", getAllData);
router.get("/:id", getById);
router.patch("/:id", verifyToken, updateData);
router.delete("/:id", verifyToken, deleted);

module.exports = router;
