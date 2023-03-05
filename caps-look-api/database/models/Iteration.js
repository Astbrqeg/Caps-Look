const db = require('../connection')

const createIteration = async (
  iteration_name,
  project_id,
  iteration_number,
  iteration_start_date,
  iteration_end_date
) => {
  return await db.query(
    `INSERT INTO iteration (iteration_name,project_id, iteration_number,
      iteration_start_date,
      iteration_end_date) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [
      iteration_name,
      project_id,
      iteration_number,
      iteration_start_date,
      iteration_end_date
    ]
  )
}
const editIteration = async (
  id,
  iteration_name,
  project_id,
  iteration_number,
  iteration_start_date,
  iteration_end_date
) => {
  return await db.query(
    `UPDATE iteration SET iteration_name= ($2),project_id=($3) ,iteration_number=($4),
  iteration_start_date=($5),
  iteration_end_date=($6) WHERE id = ($1)`,
    [
      id,
      iteration_name,
      project_id,
      iteration_number,
      iteration_start_date,
      iteration_end_date
    ]
  )
}
const deleteIteration = async (id) => {
  return await db.query(`DELETE FROM iteration WHERE id = ($1)`, [id])
}
const getIterations = async () => {
  const iterationTable = await db.query(`SELECT * FROM iteration`)
  return iterationTable.rows
}
const getProjectIterations = async (ProjectId) => {
  const iterationTable = await db.query(
    `SELECT * FROM iteration where project_id = ($1)`,
    [ProjectId]
  )
  return iterationTable.rows
}

module.exports = {
  createIteration,
  editIteration,
  deleteIteration,
  getIterations,
  getProjectIterations
}
