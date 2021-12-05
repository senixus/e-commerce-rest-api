const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  addCategory,
  addProduct,
  removeCategory,
  removeProduct,
  updateCategory,
  updateProduct,
  updateOrder,
} = require("../controllers/adminController");

const { checkIsAdmin, verifyToken } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const productSchema = require("../validations/product");
const categorySchema = require("../validations/category");

router.get("/orders", [verifyToken, checkIsAdmin], getAllOrders);

router.post("/update-order/:id", [verifyToken, checkIsAdmin], updateOrder);

router.post(
  "/add-category",
  [verifyToken, checkIsAdmin, validate(categorySchema.createValidation)],
  addCategory
);
router.post(
  "/update-category/:id",
  [(verifyToken, checkIsAdmin, validate(categorySchema.createValidation))],
  updateCategory
);
router.post("/remove-category", [verifyToken, checkIsAdmin], removeCategory);
router.post(
  "/add-product",
  [verifyToken, checkIsAdmin, validate(productSchema.createValidation)],
  addProduct
);
router.post(
  "/update-product/:id",
  [verifyToken, checkIsAdmin, validate(productSchema.createValidation)],
  updateProduct
);
router.post("/remove-product/:id", [verifyToken, checkIsAdmin], removeProduct);

module.exports = router;
