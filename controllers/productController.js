const ProductService = require("../services/ProductService");
const httpStatus = require("http-status");
const ProductModel = require("../models/Product");

const getAll = async (req, res) => {
  const products = await ProductService.getAll();
  res.status(httpStatus.OK).json({ success: true, data: products });
};

const create = async (req, res) => {
  const isExistingProduct = await ProductModel.findOne({
    productName: req.body.productName,
  });
  if (isExistingProduct) {
    res
      .status(httpStatus.CONFLICT)
      .json({ success: false, message: "Product already exists" });
    return;
  }

  const product = await ProductService.create(req.body);
  res.status(httpStatus.CREATED).json({ success: true, data: product });
};

const update = async (req, res) => {
  const isExistingProduct = await ProductModel.findById(req.params.id);

  if (isExistingProduct) {
    const product = await ProductService.update(req.params.id, req.body);
    res.status(httpStatus.OK).json({ success: true, data: product });
    return;
  }

  res
    .status(httpStatus.NOT_FOUND)
    .json({ success: false, message: "Product not found" });
};

const remove = async (req, res) => {
  const isExistingProduct = await ProductModel.findById(req.params.id);

  if (isExistingProduct) {
    const product = await ProductService.remove(req.params.id);
    res.status(httpStatus.OK).json({ success: true, data: product });
    return;
  }

  res
    .status(httpStatus.NOT_FOUND)
    .json({ success: false, message: "Product not found" });
};

module.exports = {
  create,
  update,
  remove,
  getAll,
};
