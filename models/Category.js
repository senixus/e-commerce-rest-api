const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },

    categoryDescription: {
      type: String,
      required: true,
      trim: true,
    },

    // product: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Product",
    // },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
