const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const schema = require("../validations/user");
const { verifyToken } = require("../middlewares/auth");
const {
  login,
  register,
  logout,
  update,
  getById,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/login", login);
router.get("/:id", verifyToken, getById);
router.post("/register", validate(schema.createValidation), register);
router.post("/logout", verifyToken, logout);
router.post("/update/:id", verifyToken, update);

module.exports = router;
