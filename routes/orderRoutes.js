const express = require("express");
const router = express.Router();

const { checkIsAdmin, verifyToken } = require("../middlewares/auth");

router.post("/add", (req, res) => {});
router.post("/update", (req, res) => {});
router.post("/delete", (req, res) => {});

module.exports = router;
