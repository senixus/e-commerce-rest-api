const dotenv = require("dotenv");

const mongoose = require("mongoose");

function db() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = () => {
  dotenv.config();
  db();
};
