const express = require("express");
const router = express.Router();
const { getAll } = require("../controllers/productController");

router.get("/", getAll);

module.exports = router;
