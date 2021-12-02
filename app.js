const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 3001;

config();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
