const httpStatus = require("http-status");

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
  try {
    await productService.update(req.params.id, req.body);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Product not found",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    await categoryService.update(req.params.id, req.body);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Category updated successfully" });
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Category not found",
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productService.remove(req.params.id);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Product removed successfully" });
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Product not found",
    });
  }
};

const removeCategory = async (req, res) => {
  try {
    await categoryService.remove(req.params.id);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Category removed successfully" });
  } catch (err) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Category not found",
    });
  }
};

module.exports = {
  addProduct,
  addCategory,
  updateProduct,
  updateCategory,
  removeProduct,
  removeCategory,
};
