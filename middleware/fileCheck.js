const path = require('path');
const fs = require('fs');




module.exports.fileCheck = (req, res, next) => {
  if (!req.files?.product_image) {
    return res.status(400).json({
      status: 'error',
      message: 'send a valid image'
    });
  } else {
    const file = req.files.product_image;
    const exts = ['.jpg', '.png', '.jpeg'];
    const filePath = path.extname(file.name);
    if (exts.includes(filePath)) {
      file.mv(`./uploads/image/${file.name}`);
      req.imagePath = `/uploads/image/${file.name}`;
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'send a valid image'
      });
    }

  }

}




module.exports.updateFileCheck = (req, res, next) => {
  if (!req.files?.product_image) {
    next();
  } else {
    const oldImage = req.query.oldImage;

    fs.unlink(`.${oldImage}`, (err) => {

    });

    const file = req.files.product_image;
    const exts = ['.jpg', '.png', '.jpeg'];
    const filePath = path.extname(file.name);
    if (exts.includes(filePath)) {
      file.mv(`./uploads/image/${file.name}`);
      req.newImagePath = `/uploads/image/${file.name}`;
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'send a valid image'
      });
    }

  }

}