const db = require('../connection')

const createJob = async (job_name) => {
  return await db.query(`INSERT INTO job (job_name) VALUES ($1) RETURNING *`, [
    job_name
  ])
}
const editJob = async (id, job_name) => {
  return await db.query(`UPDATE job SET job_name= ($2) WHERE id = ($1)`, [
    id,
    job_name
  ])
}
const deleteJob = async (id) => {
  return await db.query(`DELETE FROM job WHERE id = ($1)`, [id])
}
const getJobs = async () => {
  const jobTable = await db.query(`SELECT * FROM job`)
  return jobTable.rows
}
module.exports = { createJob, editJob, deleteJob, getJobs }
