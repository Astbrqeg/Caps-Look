const logger = require('../../logger')
const db = require('../connection')

const getScrums = async (projectId) => {
  if (projectId == null) {
    return null
  } else {
    const scrumTable = await db.query(
      `select s.id, scrum_name, scrum_master_id , employee_name, application_name ,s.application_id from scrum as s 
     inner join employee as em on s.scrum_master_id=em.id 
     inner join application as ap on s.application_id = ap.id 
     where s.project_id=($1) and s.isarchived = false`,
      [projectId]
    )
    const number_of_emp = await db.query(
      `select count (s.id) as emplyeenumber from scrum as s 
    inner join employee as em on s.project_id=em.project_id 
    where s.project_id=($1) group by s.id ;`,
      [projectId]
    )
    const reponse = scrumTable.rows.map((scrum, index) => ({
      scrum_name: scrum.scrum_name,
      scrum_id: scrum.id,
      scrum_master_id: scrum.scrum_master_id,
      scrum_master_name: scrum.employee_name,
      app_name: scrum.application_name,
      app_id: scrum.application_id,
      number_of_emp: number_of_emp.rows[index].emplyeenumber
    }))
    return reponse
  }
}

const createScrum = async (
  scrum_name,
  scrum_master_id,
  project_id,
  application_id
) => {
  return await db.query(
    `INSERT INTO scrum (scrum_name,scrum_master_id,project_id,application_id) VALUES ($1,$2,$3,$4) RETURNING *`,
    [scrum_name, scrum_master_id, project_id, application_id]
  )
}
const editScrum = async (
  id,
  scrum_name,
  scrum_master_id,
  project_id,
  application_id
) => {
  return await db.query(
    `UPDATE scrum SET scrum_name=($2), scrum_master_id=($3),project_id=($4),application_id=($5) WHERE id = ($1)`,
    [id, scrum_name, scrum_master_id, project_id, application_id]
  )
}

const getScrumsMaster = async () => {
  return await db.query(
    `select id,employee_name from employee where access_tier = 'scrum_master' ;`
  )
}

const ArchivedScrum = async (id) => {
  return await db.query(
    `
  UPDATE scrum SET isarchived = true where id = ($1)`,
    [id]
  )
}

module.exports = {
  getScrums,
  createScrum,
  editScrum,
  ArchivedScrum,
  getScrumsMaster
}
