const CategoryService = require("../services/CategoryService");
const httpStatus = require("http-status");

const getAll = async (req, res) => {
  const categories = await CategoryService.getAll();
  res.status(httpStatus.OK).json({ success: true, data: categories });
};

module.exports = {
  getAll,
};
