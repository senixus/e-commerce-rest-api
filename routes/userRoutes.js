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
} = require("../controllers/userController");

router.post("/login", login);
router.post("/register", validate(schema.createValidation), register);
router.post("/logout", verifyToken, logout);
router.post("/update/:id", verifyToken, update);
router.post("/forgot-password", (req, res) => {});

module.exports = router;
