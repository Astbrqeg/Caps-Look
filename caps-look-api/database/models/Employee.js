const db = require('../connection')

const editEmployee = async (
  id,
  employee_name,
  id_number,
  email,
  phone,
  site_id,
  job_id,
  access_tier
) => {
  return await db.query(
    `UPDATE employee SET employee_name= ($2),id_number=($3),email=($4),phone=($5),site_id=($6),job_id=($7),access_tier=($8) WHERE id = ($1)`,
    [id, employee_name, id_number, email, phone, site_id, job_id, access_tier]
  )
}

const getEmployees = async () => {
  const employeeTable = await db.query(`SELECT * FROM employee`)
  return employeeTable.rows
}

const getEmployeeDetails = async () => {
  const employeePage = await db.query(`SELECT employee.id,
  employee.id_number,
  employee.employee_name,
  employee.email,
  employee.phone,
  employee.productivity,
  job.job_name,
  employee.access_tier,
  project.project_name,
  scrum.scrum_name,
  application.application_name,
  job.id as job_id,
  employee.site_id as site_id
  FROM
  employee
  inner  JOIN job ON employee.job_id = job.id
  left  JOIN project ON employee.project_id = project.id 
  left JOIN employee_scrum ON employee.id = employee_scrum.employee_id
  left JOIN scrum ON scrum.id = employee_scrum.scrum_id
  left JOIN application ON application.id = scrum.application_id
WHERE
  employee.isarchived = false OR employee.project_id=null `)
  return employeePage.rows
}

const addingEmployee = async (
  Id,
  employeeName,
  email,
  phone,
  productivety = 'NA',
  siteId,
  jobId,
  accessTier
) => {
  return await db.query(
    `INSERT INTO employee (id_number,employee_name,email,phone,productivity,site_id,job_id,access_tier) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [Id, employeeName, email, phone, productivety, siteId, jobId, accessTier]
  )
}
const moveEmployeeToArchive = async (id) => {
  return await db.query(`Update employee set isarchived=true WHERE id = ($1)`, [
    id
  ])
}
const importEmployee = async (list) => {
  list.map(async (item) => {
    return await db.query(
      `INSERT INTO employee (
      id_number,employee_name,email,phone,productivity,site_id,job_id,access_tier) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        item.id_number,
        item.employee_name,
        item.email,
        item.phone,
        item.productivity,
        item.site_id,
        item.job_id,
        item.access_tier
      ]
    )
  })
}
module.exports = {
  editEmployee,
  getEmployees,
  getEmployeeDetails,
  addingEmployee,
  moveEmployeeToArchive,
  importEmployee
}
