const db = require('../database/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = async (req, res) => {
  const email = req.body.Email
  const password = req.body.password
  try {
    const results = await db.query(
      'SELECT * FROM users INNER JOIN employee ON users.employee_id = employee.id WHERE users.email = $1',
      [email]
    )

    if (results.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Incorrect password or email'
      })
    }

    const user = results.rows[0]

    const isCorrectpass = await bcrypt.compare(password, user.password)
    if (!isCorrectpass) {
      return res.status(403).json({
        success: false,
        message: 'Incorrect password or email'
      })
    }

    const token = jwt.sign(
      { id: user.id, access_tier: user.access_tier },
      process.env.TOKEN_SECRET
    )

    res.cookie('userToken', token)
    res.status(200).json({
      success: true,
      token: token
    })
  } catch (err) {
    res.status(500).json({ success: false })
  }
}
