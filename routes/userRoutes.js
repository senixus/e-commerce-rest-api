const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const schema = require("../validations/category");

const { login, register } = require("../controllers/userController");

router.post("/login", login);
router.post("/register", validate(schema.createValidation), register);
router.post("/forgot-password", (req, res) => {});

module.exports = router;
