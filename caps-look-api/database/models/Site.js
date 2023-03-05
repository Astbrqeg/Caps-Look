const db = require('../connection')

const createSite = async (site_name, country_name) => {
  return await db.query(
    `INSERT INTO site (site_name, country_name) VALUES ($1, $2) RETURNING *`,
    [site_name, country_name]
  )
}
const editSite = async (id, site_name, country_name) => {
  return await db.query(
    `UPDATE site SET site_name = ($2), country_name=($3) WHERE id = ($1)`,
    [id, site_name, country_name]
  )
}
const archiveSite = async (id) => {
  return await db.query(`update site set isarchived=true WHERE id = ($1)`, [id])
}
const getSitesDetails = async () => {
  const siteTable =
    await db.query(`SELECT site.id, site.site_name,site.country_name, (SELECT COUNT(*) FROM employee where employee.site_id=site.id) as employee_number FROM
  site where isarchived=false`)
  return siteTable.rows
}
const getSites = async () => {
  const siteTable = await db.query(`SELECT * from site`)

  return siteTable.rows
}

module.exports = {
  createSite,
  editSite,
  archiveSite,
  getSites,
  getSitesDetails
}
