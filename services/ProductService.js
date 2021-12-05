const Product = require("../models/Product");
const BaseService = require("./BaseService");

class ProductService extends BaseService {
  model = Product;
}

module.exports = new ProductService();
