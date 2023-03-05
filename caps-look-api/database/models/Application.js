const db = require('../connection')

const createApplication = async (application_name, project_id) => {
  return await db.query(
    `INSERT INTO application (application_name,project_id) VALUES ($1,$2) RETURNING *`,
    [application_name, project_id]
  )
}
const editApplication = async (id, application_name, project_id) => {
  return await db.query(
    `UPDATE application SET application_name= ($2),project_id=($3) WHERE id = ($1) `,
    [id, application_name, project_id]
  )
}
const deleteApplication = async (id) => {
  return await db.query(`DELETE FROM application WHERE id = ($1)`, [id])
}
const getApplications = async () => {
  const applicationTable = await db.query(`SELECT * FROM application`)
  return applicationTable.rows
}

const getApplicationsByProjectId = async (id) => {
  const applicationTable = await db.query(
    `SELECT * FROM application where project_id=($1)`,
    [id]
  )
  return applicationTable.rows
}
module.exports = {
  editApplication,

  deleteApplication,
  getApplications,
  getApplicationsByProjectId
}
