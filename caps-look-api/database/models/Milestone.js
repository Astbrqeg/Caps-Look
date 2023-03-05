const db = require('../connection')

const createMilestone = async (
  milestone_name,
  milestone_date,
  project_id,
  description
) => {
  return await db.query(
    `INSERT INTO milestone (milestone_name,milestone_date,project_id,description) VALUES ($1,$2,$3,$4) RETURNING *`,
    [milestone_name, milestone_date, project_id, description]
  )
}
const editMilestone = async (
  id,
  milestone_name,
  milestone_date,
  project_id,
  description
) => {
  return await db.query(
    `UPmilestone_date milestone SET milestone_name= ($2),milestone_date=($3),project_id=($4),description=($5) WHERE id = ($1)`,
    [id, milestone_name, milestone_date, project_id, description]
  )
}
const deleteMilestone = async (id) => {
  return await db.query(`DELETE FROM milestone WHERE id = ($1)`, [id])
}
const getMilestones = async () => {
  const milestoneTable = await db.query(`SELECT * FROM milestone`)
  return milestoneTable.rows
}
module.exports = {
  createMilestone,
  editMilestone,
  deleteMilestone,
  getMilestones
}
