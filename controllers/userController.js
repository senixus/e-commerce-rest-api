const UserService = require("../services/UserService");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { setToken } = require("../middlewares/auth");
const httpStatus = require("http-status");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid password",
    });
  }
  const userData = {
    ...user,
    access_token: setToken(user),
  };

  return res.status(httpStatus.OK).json({
    success: true,
    message: userData,
  });
};

const register = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "User already exists",
    });
  }

  await UserService.create(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User registered successfully",
  });
};

module.exports = {
  login,
  register,
};
