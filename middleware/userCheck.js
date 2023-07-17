const jwt = require('jsonwebtoken');


module.exports.userCheck = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {

    const decoded = jwt.decode(token, 'jsonwebtoken')
    if (decoded) {

      req.userId = decoded.id
      req.isAdmin = decoded.isAdmin


      return next();
    }
    else {
      return res.status(401).json({
        status: 'error',
        message: 'You aren\'t logged in'
      })
    }
  }

  else {
    return res.status(401).json({
      status: 'error',
      message: 'You aren\'t logged in'
    })
  }


}