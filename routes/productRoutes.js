const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  getProductsByCategory,
} = require("../controllers/productController");

router.get("/", getAll);
router.get("/:id", getById);
router.get("/category/:id", getProductsByCategory);

module.exports = router;
