const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const userCheck = require('../middleware/userCheck');

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const orderSchema = Joi.object({
  totalPrice: Joi.number().required(),
  orderItems: Joi.array().min(1).required()
})




router.post('/api/orderAdd', userCheck.userCheck, validator.body(orderSchema), orderController.addOrder);
router.get('/api/getUserOrder', userCheck.userCheck, orderController.getOrderByUser);
router.get('/api/getAllOrders', userCheck.adminCheck, orderController.getAllOrders);
router.get('/api/getOrder/:id', userCheck.userCheck, orderController.getOrderById)



module.exports = router;