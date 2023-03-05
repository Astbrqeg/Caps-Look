const db = require('../connection')
const getProjectSiteMix = async (projectId) => {
  const sitemix = await db.query(
    `SELECT planned_site_mix FROM project WHERE id=$1`,
    [projectId]
  )
  return sitemix.rows
}

const startDay = async (projectId) => {
  const projectdate = await db.query(
    `SELECT start_date FROM project WHERE id=$1`,
    [projectId]
  )
  return projectdate.rows
}
const count_employees = async (projectId) => {
  const employees_number = await db.query(
    `SELECT COUNT (id) FROM employee WHERE project_id =$1`,
    [projectId]
  )
  return employees_number.rows
}

const count_scrums = async (projectId) => {
  const scrum_number = await db.query(
    `SELECT COUNT (id) FROM scrum WHERE project_id =$1`,
    [projectId]
  )
  return scrum_number.rows
}

const count_iterations = async (projectId) => {
  const iterations_num = await db.query(
    `SELECT COUNT (id) FROM iteration WHERE project_id =$1`,
    [projectId]
  )
  return iterations_num.rows
}

const count_sites = async (projectId) => {
  const sites_num = await db.query(
    `SELECT COUNT (DISTINCT site_id) FROM employee WHERE project_id=$1`,
    [projectId]
  )
  return sites_num.rows
}
module.exports = {
  count_iterations,
  count_scrums,
  count_sites,
  startDay,
  count_employees
}
