const Order = require('../model/Order');
const fs = require('fs');
const mongoose = require('mongoose');


module.exports.getAllOrders = async (req, res) => {
  // console.log(req.params);
  //console.log(req.query);
  try {
    const response = await Order.find();

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}

module.exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'please provide valid id'
      });
    } else {
      const response = await Order.findById(id);
      return res.status(200).json(response)
    }


  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}


module.exports.getOrderByUser = async (req, res) => {

  try {
    if (!mongoose.isValidObjectId(req.userId)) {
      return res.status(400).json({
        status: 'error',
        message: 'please provide valid id'
      });
    } else {
      const response = await Order.find({ user: req.userId });
      return res.status(200).json(response)
    }


  } catch (err) {

    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }


}



module.exports.addOrder = async (req, res) => {

  const {
    orderItems,
    totalPrice
  } = req.body;
  try {



    await Order.create({
      user: req.userId,
      orderItems,
      totalPrice
    });


    return res.status(201).json({
      status: 'success',
      message: "order added succesfully"
    });


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}