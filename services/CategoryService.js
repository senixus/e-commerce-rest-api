const CategorySchema = require("../models/Category");
const BaseService = require("./BaseService");

class CategoryService extends BaseService {
  model = CategorySchema;
}

module.exports = new CategoryService();
