const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports.userLogin = async (req, res) => {

  // return res.status(200).json('hello');
  const { email, password } = req.body;
  console.log(email);
  try {

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({
        status: 404,
        message: 'user doesnot exist'
      })
    } else {

      const isValid = bcrypt.compareSync(password, userExist.password);

      if (isValid) {
        const token = jwt.sign({ id: userExist._id, isAdmin: userExist.isAdmin }, 'jsonwebtoken');
        res.status(200).json({
          email,
          token,
          shippingAddress: userExist.shippingAddress,
          fullname: userExist.fullname
        })
      } else {
        return res.status(404).json({
          status: 404,
          message: 'pwd not match'
        })
      }

    }

  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: `${err}`
    })
  }
}







module.exports.userRegister = async (req, res) => {
  const { email, password, fullname } = req.body;

  try {

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(404).json({
        status: 404,
        message: 'user already exists'
      })
    } else {

      const hashed = await bcrypt.hash(password, 10);

      await User.create({
        email,
        fullname,
        password: hashed
      });

      return res.status(201).json({
        status: "succes",
        message: 'sudusf'
      })

    }

  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: `${err}`
    })
  }
}