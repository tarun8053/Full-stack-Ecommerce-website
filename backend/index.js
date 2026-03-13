require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://shop2hub.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb is connect"))
  .catch(err => console.log("error :", err));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);

if (process.env.NODE_ENV === 'production') {
const clientBuildPath = path.join(__dirname, '..', 'frontent', 'ecommerce-frontent', 'dist');
  app.use(express.static(clientBuildPath));

  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));