const express = require("express");
const router = express.Router();
const {
  addCategory,
  addProduct,
  removeCategory,
  removeProduct,
  updateCategory,
  updateProduct,
} = require("../controllers/adminController");

const { checkIsAdmin, verifyToken } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const productSchema = require("../validations/product");
const categorySchema = require("../validations/category");

router.post(
  "/add-category",
  [verifyToken, checkIsAdmin, validate(categorySchema)],
  addCategory
);
router.post(
  "/update-category",
  [verifyToken, checkIsAdmin, validate(categorySchema)],
  updateCategory
);
router.post("/remove-category", [verifyToken, checkIsAdmin], removeCategory);
router.post(
  "/add-product",
  [verifyToken, checkIsAdmin, validate(productSchema)],
  addProduct
);
router.post(
  "/update-product",
  [verifyToken, checkIsAdmin, validate(productSchema)],
  updateProduct
);
router.post("/remove-product", [verifyToken, checkIsAdmin], removeProduct);

module.exports = router;
