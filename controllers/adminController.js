const httpStatus = require("http-status");

const categoryModel = require("../models/Category");
const productModel = require("../models/Product");

const productService = require("../services/ProductService");
const categoryService = require("../services/CategoryService");

const addProduct = async (req, res) => {
  await productService.create(req.body);
  res
    .status(httpStatus.CREATED)
    .json({ success: true, message: "Product created successfully" });
};

const addCategory = async (req, res) => {
  await categoryService.create(req.body);
  res
    .status(httpStatus.CREATED)
    .json({ success: true, message: "Category created successfully" });
};

const updateProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Product not found",
    });
  }

  await productService.update(req.body);
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Product updated successfully" });
};

const updateCategory = async (req, res) => {
  const product = await categoryModel.findById(req.params.id);

  if (!product) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Category not found",
    });
  }

  await categoryService.update(req.body);
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Category updated successfully" });
};

const removeProduct = async (req, res) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Product not found",
    });
  }

  await productService.remove(req.params.id);
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Product removed successfully" });
};

const removeCategory = async (req, res) => {
  const category = await categoryModel.findById(req.params.id);

  if (!category) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Category not found",
    });
  }

  await categoryService.remove(req.params.id);
  res
    .status(httpStatus.OK)
    .json({ success: true, message: "Category removed successfully" });
};

module.exports = {
  addProduct,
  addCategory,
  updateProduct,
  updateCategory,
  removeProduct,
  removeCategory,
};
