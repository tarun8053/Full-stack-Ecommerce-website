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
        origin:['http://localhost:5173', 'https://shop2hub.onrender.com'],
        credentials : true
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

if (process.env.NODE_ENV === 'production') {
    const clientBuildPath = path.join(__dirname, '..', 'frontend', 'dist');
    app.use(express.static(clientBuildPath));

    // Catch-all middleware: send index.html so React Router can handle client-side routing
    // Use a middleware instead of a route pattern to avoid path-to-regexp parsing issues
    app.use((req, res, next) => {
        // If request starts with /api, pass through to API routes
        if (req.path.startsWith('/api')) return next();
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}


app.listen(3000, ()=> console.log("Server start on port 3000"));