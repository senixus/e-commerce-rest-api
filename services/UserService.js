const BaseService = require("./BaseService");
const User = require("../models/User");

class UserService extends BaseService {
  model = User;
}

module.exports = new UserService();
