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

const getProductsByCategory = async (req, res) => {
  try {
    const products = await productService.getAll();
    const categoryProducts = products.filter((product) =>
      product.category.includes(req.params.id)
    );
    if (categoryProducts.length) {
      return res
        .status(httpStatus.OK)
        .json({ success: true, data: categoryProducts });
    }
    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "Products not found" });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAll,
  getById,
  getProductsByCategory,
};
