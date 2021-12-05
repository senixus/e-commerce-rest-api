const express = require("express");
const router = express.Router();

const {
  cancel,
  create,
  getById,
  getByUserId,
} = require("../controllers/orderController");

const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, getByUserId);
router.post("/add", verifyToken, create);
router.post("/update/:id", verifyToken, (req, res) => {});
router.post("/cancel/:id", verifyToken, cancel);
router.get("/:id", verifyToken, getById);

module.exports = router;
