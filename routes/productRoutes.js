const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const fileCheck = require('../middleware/fileCheck.js');
const userCheck = require('../middleware/userCheck');



router.get('/', productController.getAllProducts);
router.get('/api/product/:id', productController.getProductById);
router.post('/api/add/product', userCheck.adminCheck, fileCheck.fileCheck, productController.addProduct);
router.patch('/api/update/product/:id', userCheck.adminCheck, fileCheck.updateFileCheck, productController.updateProduct);
router.delete('/api/remove/product/:id', userCheck.adminCheck, productController.removeProduct);
router.patch('/api/add/review/:id', userCheck.userCheck, productController.addReview);



module.exports = router
