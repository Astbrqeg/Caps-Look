const jwt = require('jsonwebtoken')
const tokensBlacklist = require('../database/initNodeCache')

require('dotenv').config()
module.exports = (req, res, next) => {
  const userToken = req.cookies.userToken

  if (!userToken) {
    return res.status(403).send({ success: false })
  }

  jwt.verify(userToken, process.env.TOKEN_SECRET)

  if (tokensBlacklist.get(userToken)) {
    return res.status(403).json({
      success: false,
      message: 'login again!'
    })
  }

  next()
}
