const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createOrder, getAllOrder, getOrderById, updateOrderStatus, getAllOrderForAdmin } = require('../controllers/orderController');
//const { getCategory, deletecategory, updateCategory, getAllCategory, createCategory } = require('../controllers/categoryController');
const router = express.Router();


router.post('/create', authMiddleware, createOrder);
router.get('/', authMiddleware, getAllOrder);  
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id', authMiddleware, updateOrderStatus); 
router.get('/admin/order', authMiddleware, getAllOrderForAdmin);       

module.exports = router;