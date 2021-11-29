const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters long"],
      maxlength: [20, "Category name must be at most 20 characters long"],
    },

    categoryDescription: {
      type: String,
      required: [true, "Category description is required"],
      trim: true,
      minlength: [
        20,
        "Category description must be at least 2 characters long",
      ],
      maxlength: [
        200,
        "Category description must be at most 20 characters long",
      ],
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
