const express = require("express");
const router = express.Router();
const {
  create,
  update,
  remove,
  getAll,
} = require("../controllers/categoryController");

router.get("/", getAll);
router.post("/add", create);
router.post("/update/:id", update);
router.post("/delete/:id", remove);

module.exports = router;
