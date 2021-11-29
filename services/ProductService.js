const ProductSchema = require("../models/Product");
const BaseService = require("./BaseService");

class ProductService extends BaseService {
  model = ProductSchema;
}

module.exports = new ProductService();
