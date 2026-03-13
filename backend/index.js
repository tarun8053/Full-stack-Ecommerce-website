require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://shophub-ffwf.onrender.com"],
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
  const possibleClientDirs = [
    path.join(__dirname, '..', 'frontent', 'ecommerce-frontent', 'dist'),
    path.join(__dirname, '..', '..', 'frontent', 'ecommerce-frontent', 'dist'),
    path.join(__dirname, 'frontent', 'ecommerce-frontent', 'dist'),
  ];

  const clientBuildPath = possibleClientDirs.find(p => fs.existsSync(p));

  if (!clientBuildPath) {
    console.warn('Could not find frontend build output (dist/index.html). Searched in:', possibleClientDirs);
  } else {
    console.log('Serving built frontend from', clientBuildPath);
    app.use(express.static(clientBuildPath));

    app.use((req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server start on port ${PORT}`));