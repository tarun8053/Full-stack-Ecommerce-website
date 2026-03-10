require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use(express.json());
app.use(cors(
    {
        origin:['http://localhost:5173', 'https://shop2hub.onrender.com/']
    }
))
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("mongodb is connect"))
    .catch(err => console.log("error :", err));
    
    
app.use('/api/auth', authRoutes); 
app.use('/api/categories', categoryRoutes)
app.use('/api/product', productRoutes) 
app.use('/api/order', orderRoutes); 
app.listen(3000, ()=> console.log("Server start on port 3000"));