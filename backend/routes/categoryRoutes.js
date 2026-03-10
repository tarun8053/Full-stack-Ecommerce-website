const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { getCategory, deletecategory, updateCategory, getAllCategory, createCategory } = require('../controllers/categoryController');
const router = express.Router();


router.post('/create', authMiddleware, createCategory);
router.get('/list', authMiddleware, getAllCategory);  
router.get('/:id', authMiddleware, getCategory);     
router.delete('/:id', authMiddleware, deletecategory);
router.put('/:id', authMiddleware, updateCategory);

module.exports = router;