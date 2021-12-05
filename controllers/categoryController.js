const categoryService = require("../services/CategoryService");
const httpStatus = require("http-status");

const getAll = async (req, res) => {
  const categories = await categoryService.getAll();
  res.status(httpStatus.OK).json({ success: true, data: categories });
};

const getById = async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id);

    if (category._id) {
      return res.status(httpStatus.OK).json({ success: true, data: category });
    }
    res.status(httpStatus.NOT_FOUND);
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "Category not found" });
  }
};

module.exports = {
  getAll,
  getById,
};
