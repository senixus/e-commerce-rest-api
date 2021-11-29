const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters long"],
      maxlength: [20, "Product name must be at most 20 characters long"],
    },
    productPrice: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
    },
    productQuantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      trim: true,
    },
    productDescription: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [20, "Product description must be at least 2 characters long"],
      maxlength: [
        200,
        "Product description must be at most 20 characters long",
      ],
    },
    //   productImage: {
    //     type: String,
    //     required: [true, "Product image is required"],
    //     trim: true,
    //   },
    // productCategory: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "Category",
    //   },
    // ],
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
