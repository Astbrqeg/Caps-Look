const db = require('../connection')

const createProject = async (
  project_name,
  start_date,
  project_iterations_count,
  plannedMix = {}
) => {
  return await db.query(
    `INSERT INTO project (project_name,planned_site_mix,start_date,project_iterations_count) VALUES ($1,$2,$3,$4) RETURNING *`,
    [project_name, plannedMix, start_date, project_iterations_count]
  )
}
const editProject = async (
  project_name,
  project_iterations_count,
  start_date,
  id,
  plannedMix = {}
) => {
  return await db.query(
    `UPDATE project SET project_name= $1,planned_site_mix=$2, project_iterations_count=$3 ,start_date=$4  where id=$5`,
    [project_name, plannedMix, project_iterations_count, start_date, id]
  )
}

const getProjects = async () => {
  const projectTable = await db.query(
    `SELECT * FROM project order by project_name asc`
  )
  return Promise.resolve(projectTable.rows)
}

const getProjectsDetails = async () => {
  const data = await db.query(
    'SELECT project.project_name,project.id,project.start_date,(SELECT COUNT(*) FROM iteration where project_id=project.id) as iteration_number, (SELECT COUNT(*) FROM scrum where project_id=project.id) as scrum_number,(SELECT COUNT(*) FROM employee WHERE employee.project_id = project.id) as employee_number FROM project where isarchived=false'
  )
  return data.rows
}
const archivedProject = async (project_id) => {
  await db.query(`UPDATE project SET isarchived=true  where id=$1 `, [
    project_id
  ])
}
const getProjectSiteMix = async (projectId) => {
  const sitemix = await db.query(
    `SELECT planned_site_mix FROM project WHERE id=$1`,
    [projectId]
  )
  return sitemix.rows
}

const updateProjectSiteMix = async ({ projectId, planMix }) => {
  const sitemix = await db.query(
    `UPDATE project SET planned_site_mix =$1 WHERE id=$2`,
    [planMix, projectId]
  )
  return sitemix
}

const getActualSiteMix = async (projectId) => {
  const sitemix = await db.query(
    `SELECT site.cost_level, COUNT(employee.id_number) AS site_ee FROM EMPLOYEE  INNER JOIN site ON employee.site_id=site.id WHERE employee.project_id=$1 GROUP BY site.cost_level`,
    [projectId]
  )
  return sitemix.rows
}

module.exports = {
  createProject,
  editProject,
  getProjects,
  getProjectsDetails,
  getProjectSiteMix,
  updateProjectSiteMix,
  getActualSiteMix,
  archivedProject
}
