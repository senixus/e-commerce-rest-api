const UserService = require("../services/UserService");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { setToken } = require("../middlewares/auth");
const httpStatus = require("http-status");
const transporter = require("../helpers/mail");

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
    ...user._doc,
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

  // ! Email is going to throw an error
  // const info = await transporter.sendMail({
  //   from: process.env.SMTP_EMAIL,
  //   to: email,
  //   subject: "Welcome to E-commerce",
  //   html: `<h1>Welcome to E-commerce</h1>
  //   <p>You have successfully registered to our website</p>`,
  // });

  // console.log(info.messageId);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User registered successfully",
  });
};

const logout = async (req, res) => {
  req.user = null;

  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged out successfully",
  });
};

module.exports = {
  login,
  register,
  logout,
};
