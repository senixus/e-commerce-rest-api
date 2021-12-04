const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
      trim: true,
    },
    productQuantity: {
      type: Number,
      required: true,
      trim: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    //   productImage: {
    //     type: String,
    //     required: [true, "Product image is required"],
    //     trim: true,
    //   },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
