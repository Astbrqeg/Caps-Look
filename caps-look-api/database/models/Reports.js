const db = require('../connection')

const productivityEmployee = async () => {
  // const productivityEmployeeTable = await db.query(`SELECT employee.idnumber,capacity.productivity FROM employee INNER JOIN capacity ON employee.id=capacity.employee_id`);
  const productivityEmployeeTable = await db.query(
    `SELECT employee_id,productivity FROM capacity`
  )
  return productivityEmployeeTable.rows
}
module.exports = { productivityEmployee }
