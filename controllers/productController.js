const { default: mongoose } = require('mongoose');
const Product = require('../model/Product');
const fs = require('fs');

module.exports.getAllProducts = async (req, res) => {

  // console.log(req.params);
  // console.log(req.query);

  try {
    const response = await Product.find();

    return res.status(200).json(response)
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    })
  }


}

module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  // console.log(req.params);
  // console.log(req.query);

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: 'error',
        message: 'provide valid id'
      })
    } else {
      const response = await Product.findById(id);
      return res.status(200).json(response)
    }
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    })
  }

}


module.exports.addProduct = async (req, res) => {
  const imagePath = req.imagePath
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock
  } = req.body;
  try {


    await Product.create({
      product_name,
      product_detail,
      product_price,
      product_image: imagePath,
      brand,
      category,
      countInStock
    });

    return res.status(201).json({
      status: 'success',
      message: "product added succesfully"
    });



  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}


module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock
  } = req.body;
  try {



    if (req.newImagePath) {

      await Product.findByIdAndUpdate({ _id: id }, {
        product_name,
        product_detail,
        product_price,
        product_image: req.newImagePath,
        brand,
        category,
        countInStock
      });

    } else {
      await Product.findByIdAndUpdate({ _id: id }, {
        product_name,
        product_detail,
        product_price,
        brand,
        category,
        countInStock
      });


    }

    return res.status(200).json({
      status: 'success',
      message: "product updated succesfully"
    });
  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}








module.exports.removeProduct = async (req, res) => {

  const { id } = req.params;
  const imagePath = req.query.imagePath;
  // const { imagePath } = req.query;

  try {



    await Product.findByIdAndDelete({ _id: id });
    fs.unlink(`.${imagePath}`, (err) => {
    })
    return res.status(201).json({
      status: 'success',
      message: "product removed succesfully"
    });




  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}


module.exports.addReview = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const {
    username,
    comment,
    rating,
    user
  } = req.body;
  try {

    const isExist = await Product.findById(id);
    if (isExist) {

      const isReviewed = isExist.reviews.find((dat) => dat.user.toString() === userId);

      if (isReviewed) {
        return res.status(400).json({
          status: 'error',
          message: "you have already review this product"
        });
      } else {
        isExist.reviews.push({ username, comment, rating: Number(rating), user });

        const total = isExist.reviews.reduce((a, b) => a + b.rating, 0);
        isExist.rating = total / isExist.reviews.length;
        isExist.numReviews = isExist.reviews.length;

        isExist.save();

        return res.status(201).json({
          status: 'success',
          message: "review added succesfully"
        });
      }



    } else {
      return res.status(400).json({
        status: 'error',
        message: "product doesn't exist"
      });
    }




  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: `${err}`
    });
  }



}
