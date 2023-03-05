const db = require('../connection')

const createEmployee_scrum = async (employee_id, scrum_id) => {
  return await db.query(
    `INSERT INTO employee_scrum (employee_id, scrum_id) VALUES ($1,$2) RETURNING *`,
    [employee_id, scrum_id]
  )
}
const editEmployee_scrum = async (id, employee_id, scrum_id) => {
  return await db.query(
    `UPDATE employee_scrum SET employee_id=($2), scrum_id=($3) WHERE id = ($1)`,
    [id, employee_id, scrum_id]
  )
}
const deleteEmployee_scrum = async (id) => {
  return await db.query(`DELETE FROM employee_scrum WHERE id = ($1)`, [id])
}
const getEmployee_scrums = async () => {
  const scrumTable = await db.query(`SELECT * FROM employee_scrum`)
  return scrumTable.rows
}
module.exports = {
  createEmployee_scrum,
  editEmployee_scrum,
  deleteEmployee_scrum,
  getEmployee_scrums
}
