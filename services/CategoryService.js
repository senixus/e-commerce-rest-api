const Category = require("../models/Category");
const BaseService = require("./BaseService");

class CategoryService extends BaseService {
  model = Category;
}

module.exports = new CategoryService();
