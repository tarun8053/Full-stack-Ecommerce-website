const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {getAllProduct, createProduct, getProduct, deleteProduct, updateProduct} = require('../controllers/productController');
const router = express.Router();


router.get('/list', authMiddleware, getAllProduct);
router.post('/create', authMiddleware, createProduct);  
router.get('/:id', authMiddleware, getProduct);     
router.delete('/:id', authMiddleware, deleteProduct);
router.put('/:id', authMiddleware, updateProduct);

module.exports = router;