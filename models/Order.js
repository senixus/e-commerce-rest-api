const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      trim: true,
    },
    orderStatus: {
      type: String,
      default: "Pending",
    },
    orderTotal: {
      type: Number,
      required: true,
      trim: true,
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    ],

    isCanceled: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

OrderSchema.pre("save", function (next) {
  const randomOrderNumber = crypto.randomBytes(4).toString("hex");
  this.orderNumber = randomOrderNumber;
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
