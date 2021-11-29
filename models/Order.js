const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: [true, "Order number is required"],
      trim: true,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderStatus: {
      type: String,
      required: [true, "Order status is required"],
      trim: true,
    },
    orderTotal: {
      type: Number,
      required: [true, "Order total is required"],
      trim: true,
    },
    //   orderCustomer: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    //   },
    //   orderProducts: [
    //     {
    //       type: mongoose.Schema.ObjectId,
    //       ref: "Product",
    //     },
    //   ],

    //   isDeleted: {},
    //   isActive: {},
  },
  { versionKey: false, timestamps: true }
);

OrderSchema.pre("save", function (next) {
  const randomOrderNumber = crypto.randomBytes(4).toString("hex");
  this.orderNumber = randomOrderNumber;
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
