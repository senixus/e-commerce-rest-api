const httpStatus = require("http-status");
const orderService = require("../services/OrderService");

const create = async (req, res) => {
  try {
    await orderService.create(req.body);
    res
      .status(httpStatus.CREATED)
      .json({ success: true, message: "Order created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error occured while creating order" });
  }
};

const getById = async (req, res) => {
  try {
    const order = await orderService.getById(req.params.id);
    if (order._id) {
      return res.status(httpStatus.OK).json({ success: true, data: order });
    }

    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "Order not found" });
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "Error occured while getting order" });
  }
};

const cancel = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      isCanceled: true,
    };

    const order = await orderService.update(req.params.id, orderData);

    if (order._id) {
      return res
        .status(httpStatus.OK)
        .json({ success: true, data: "Order status changed" });
    }

    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "Order not found" });
  } catch (err) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({ success: false, message: "Error occured while canceling order" });
  }
};

const getByUserId = async (req, res) => {
  const user = req.user;
  const orders = await orderService.getAll();
  const userOrders = orders.filter((order) => order.user === user._id);
  if (userOrders) {
    return res.status(httpStatus.OK).json({ success: true, data: userOrders });
  }
  res
    .status(httpStatus.NOT_FOUND)
    .json({ success: false, message: "No orders found" });
};

module.exports = {
  create,
  getById,
  cancel,
  getByUserId,
};
