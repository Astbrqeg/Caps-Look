const tokensBlacklist = require('../database/initNodeCache')

const logout = async (req, res) => {
  try {
    res.clearCookie('userToken')
    res.json('logged out')
    tokensBlacklist.set(req.cookies.userToken, 1)
  } catch {
    res.status(500).json(`failed to logout`)
  }
}
module.exports = { logout }
