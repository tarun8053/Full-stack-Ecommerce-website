const path = require("path");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

/* middleware */
app.use(cors({
  origin: ["http://localhost:5173", "https://ecommerceshophubb.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

/* routes import */
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

/* database connection */
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error:", err));

/* API routes */
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

/* ---------- FRONTEND SERVE ---------- */
if (process.env.NODE_ENV === "production") {

  const clientBuildPath = path.join(
    __dirname,
    "..",
    "frontent",
    "ecommerce-frontent",
    "dist"
  );

  app.use(express.static(clientBuildPath));

  // React router handle
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });

}

/* server start */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});