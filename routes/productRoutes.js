const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
router.get('/', productController.getAllProducts);
router.get('/product/:id', productController.getAllProducts)

module.exports = router
