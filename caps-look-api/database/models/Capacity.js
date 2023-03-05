const db = require('../connection')

const createCapacity = async (
  productivity,
  availability,
  employee_id,
  total_capacity
) => {
  return await db.query(
    `INSERT INTO capacity (productivity,
        availability,
        employee_id,
        total_capacity) VALUES ($1,$2,$3,$4) RETURNING *`,
    [productivity, availability, employee_id, total_capacity]
  )
}
const editCapacity = async (
  id,
  productivity,
  availability,
  employee_id,
  total_capacity
) => {
  return await db.query(
    `UPDATE capacity SET productivity=($2),
    availability=($3),
    employee_id=($4),
    total_capacity=($5) WHERE id = ($1)`,
    [id, productivity, availability, employee_id, total_capacity]
  )
}
const deleteCapacity = async (id) => {
  return await db.query(`DELETE FROM capacity WHERE id = ($1)`, [id])
}
const getCapacitys = async () => {
  const capacityTable = await db.query(`SELECT * FROM capacity`)
  return capacityTable.rows
}

module.exports = { createCapacity, editCapacity, deleteCapacity, getCapacitys }
