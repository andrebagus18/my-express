const express = require("express");
const router = express.Router();

const {
  create,
  getAllData,
  getById,
  updateData,
  deleted,
} = require("../controllers/course.controller");

router.post("/course", create);
router.get("/course", getAllData);
router.get("/course/:id", getById);
router.patch("/course/:id", updateData);
router.delete("/course/:id", deleted);

module.exports = router;
