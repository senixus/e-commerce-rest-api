const userService = require("../services/UserService");
const User = require("../models/User");
const { setToken } = require("../middlewares/auth");
const transporter = require("../helpers/mail");

const bcrypt = require("bcryptjs");
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

  await userService.create(req.body);


  const info = await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Welcome to E-commerce",
    html: `<h1>Welcome to E-commerce</h1>
    <p>You have successfully registered to our website</p>`,
  });



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

const update = async (req, res) => {
  try {
    const userData = await userService.update(req.params.id, req.body);

    res.status(httpStatus.OK).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Error updating profile",
    });
  }
};

const getById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);

    if (user._id) {
      return res.status(httpStatus.OK).json({
        success: true,
        data: user,
      });
    }
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Error getting user",
    });
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Error getting user",
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  const resetPasswordToken = user.getResetPasswordToken();

  await user.save();

  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "User not found",
    });
  }
  const resetPasswordUrl = `http://localhost:3001/api/user/resetPassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = `
      <h3>Reset Your Password</h3>
      <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Reset Password Token",
      html: emailTemplate,
    });
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Email Sent",
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Error sending email" });
  }
};

const resetPassword = async (req, res) => {
  const { resetPasswordToken } = req.query;
  const { password } = req.body;

  if (!resetPasswordToken) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Please provide a valid token",
    });
  }
  let user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid token or Session Expired",
    });
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(httpStatus.OK).json({
    success: true,
    message: "Password reset successfully",
  });
};

module.exports = {
  login,
  register,
  logout,
  update,
  getById,
  forgotPassword,
  resetPassword,
};
