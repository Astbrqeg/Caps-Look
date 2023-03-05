const db = require('../connection')

const createUsers = async (employee_id, email, password) => {
  return await db.query(
    `INSERT INTO users (employee_id,email,password) VALUES ($1,$2,$3) RETURNING *`,
    [employee_id, email, password]
  )
}
const editUsers = async (id, employee_id, email, password) => {
  return await db.query(
    `UPDATE users SET employee_id= ($2), email=($3), password=($4) WHERE id = ($1)`,
    [id, employee_id, email, password]
  )
}
const deleteUsers = async (id) => {
  return await db.query(`DELETE FROM users WHERE id = ($1)`, [id])
}

const getUsers = async () => {
  const projectTable = await db.query(`SELECT * FROM users`)
  return projectTable.rows
}
module.exports = { createUsers, editUsers, deleteUsers, getUsers }
