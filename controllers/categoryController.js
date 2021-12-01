const CategoryService = require("../services/CategoryService");
const httpStatus = require("http-status");
const CategoryModel = require("../models/Category");

const getAll = async (req, res) => {
  const categories = await CategoryService.getAll();
  res.status(httpStatus.OK).json({ success: true, data: categories });
};

const create = async (req, res) => {
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

const update = async (req, res) => {
  const isExistingCategory = await CategoryModel.findById(req.params.id);

  if (isExistingCategory) {
    const category = await CategoryService.update(req.params.id, req.body);
    res.status(httpStatus.OK).json({ success: true, data: category });
    return;
  }

  res
    .status(httpStatus.NOT_FOUND)
    .json({ success: false, message: "Category not found" });
};

const remove = async (req, res) => {
  const isExistingCategory = await CategoryModel.findById(req.params.id);

  if (isExistingCategory) {
    const category = await CategoryService.remove(req.params.id);
    res.status(httpStatus.OK).json({ success: true, data: category });
    return;
  }

  res
    .status(httpStatus.NOT_FOUND)
    .json({ success: false, message: "Category not found" });
};

module.exports = {
  create,
  update,
  remove,
  getAll,
};
