const httpStatus = require("http-status");

const CategoryModel = require("../models/Category");
const ProductModel = require("../models/Product");

const productService = require("../services/ProductService");
const categoryService = require("../services/CategoryService");
const orderService = require("../services/OrderService");

const addProduct = async (req, res) => {
  const isExistingProduct = await ProductModel.findOne({
    productName: req.body.productName,
  });

  if (isExistingProduct) {
    return res
      .status(httpStatus.CONFLICT)
      .json({ success: false, message: "Product already exists" });
  }

  const product = await ProductService.create(req.body);
  res.status(httpStatus.CREATED).json({ success: true, data: product });
};

const addCategory = async (req, res) => {
  const isExistingCategory = await CategoryModel.findOne({
    categoryName: req.body.categoryName,
  });

  if (isExistingCategory) {
    res
      .status(httpStatus.CONFLICT)
      .json({ success: false, message: "Category already exists" });
    return;
  }

  const category = await CategoryService.create(req.body);
  res.status(httpStatus.CREATED).json({ success: true, data: category });
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

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.find();
    if (orders) {
      return res.status(httpStatus.OK).json({ success: true, data: orders });
    }
    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "No orders found" });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error while fetching orders",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    await orderService.update(req.params.id, req.body);

    res
      .status(httpStatus.OK)
      .json({ success: true, message: "Order updated successfully" });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error while updating order",
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
  getAllOrders,
  updateOrder,
};
