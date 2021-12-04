const ProductService = require("../services/ProductService");
const httpStatus = require("http-status");

const getAll = async (req, res) => {
  const products = await ProductService.getAll();
  res.status(httpStatus.OK).json({ success: true, data: products });
};

module.exports = {
  getAll,
};
