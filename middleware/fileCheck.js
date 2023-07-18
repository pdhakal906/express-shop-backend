const path = require('path');
const fs = require('fs');




module.exports.fileCheck = (req, res, next) => {


  if (!req.files?.image) {
    return res.status(400).json({
      status: 'error',
      message: 'send a valid image'
    });
  } else {
    const file = req.files.image;
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


  if (!req.files?.image) {
    next();
  } else {
    const oldImagePath = req.query.imagePath;


    fs.unlink(`.${oldImagePath}`, (err) => {
      console.log(err)
    })

    const file = req.files.image;
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
