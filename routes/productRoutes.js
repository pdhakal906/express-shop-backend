const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const fileCheck = require('../middleware/fileCheck');
const userCheck = require('../middleware/userCheck');



router.get('/', productController.getAllProducts);
router.get('/api/product/:id', productController.getAllProducts);
router.post('/api/add/product', fileCheck.fileCheck, userCheck.userCheck, productController.addProduct);
router.delete('/api/remove/product/:id', userCheck.userCheck, productController.removeProduct);



module.exports = router
