const BaseService = require("./BaseService");
const Order = require("../models/Order");

class OrderService extends BaseService {
  model = Order;
}

module.exports = new OrderService();
