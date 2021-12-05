const productService = require("../services/ProductService");
const httpStatus = require("http-status");

const getAll = async (req, res) => {
  const products = await productService.getAll();
  res.status(httpStatus.OK).json({ success: true, data: products });
};

const getById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    if (product._id) {
      return res.status(httpStatus.OK).json({ success: true, data: product });
    }
    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "Product not found" });
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "Product not found" });
  }
};

module.exports = {
  getAll,
  getById,
};
