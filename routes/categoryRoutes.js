const express = require("express");
const router = express.Router();
const {
  create,
  update,
  remove,
  getAll,
} = require("../controllers/categoryController");
const validate = require("../middlewares/validate");
const schema = require("../validations/category");

router.get("/", getAll);
router.post("/add", validate(schema.createValidation), create);
router.post("/update/:id", update);
router.post("/delete/:id", remove);

module.exports = router;
