const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userCheck = require('../middleware/userCheck')
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});



const loginSchema = Joi.object({
  email: Joi.string().email().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  password: Joi.string().required().min(6).max(20)
})


router.post('/api/userLogin', validator.body(loginSchema), userController.userLogin);
router.post('/api/userSignup', userController.userRegister);
router.patch('/api/userUpdate', userCheck.userCheck, userController.userUpdate);
router.get('/api/getUserProfile', userCheck.userCheck, userController.userProfile);
router.get('/api/allUsers', userCheck.adminCheck, userController.getAllUsers);
module.exports = router;