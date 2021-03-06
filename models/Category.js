const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const logger = require("../logger/Category");

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
  },
  { versionKey: false, timestamps: true }
);

CategorySchema.pre("save", function (next) {
  logger.log({
    level: "info",
    message: "Category kaydediliyor",
  });
  next();
});

CategorySchema.post("save", function (doc, next) {
  logger.log({
    level: "info",
    message: this,
  });
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
