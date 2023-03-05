const db = require('../connection')

const createAbsence = async (
  absence_name,
  site_id,
  mandatory,
  absence_start_date,
  absence_end_date
) => {
  return await db.query(
    `INSERT INTO absence (absence_name, 
    site_id,
    mandatory,
    absence_start_date,
    absence_end_date) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [absence_name, site_id, mandatory, absence_start_date, absence_end_date]
  )
}
const editAbsence = async (
  id,
  absence_name,
  site_id,
  mandatory,
  absence_start_date,
  absence_end_date
) => {
  return await db.query(
    `UPDATE absence SET absence_name= ($2), site_id=($3),
    mandatory=($4),
    absence_start_date=($5),
   absence_end_date=($6) WHERE id = ($1)`,
    [id, absence_name, site_id, mandatory, absence_start_date, absence_end_date]
  )
}
const archiveSelectedAbsence = async (id) => {
  return await db.query(`UPDATE absence SET isarchived=true WHERE id = ($1)`, [
    id
  ])
}

const getAbsences = async () => {
  const absenceTable = await db.query(
    `SELECT absence.id as absence_id,absence.absence_name, site.site_name, site.country_name,site.id as site_id, absence.absence_start_date, absence.absence_end_date, absence.mandatory FROM absence inner JOIN site ON absence.site_id = site.id WHERE absence.isarchived=false`
  )
  return absenceTable.rows
}

const getAbsenceSites = async () => {
  const absencesSites = await db.query(`SELECT * FROM site`)
  return absencesSites
}
const convertDdmmyyyyToMmddyyyy = (dateString) => {
  let d = dateString.split('/')
  let dat = new Date(d[2] + '/' + d[1] + '/' + d[0])
  return dat
}

const importingAbsences = (list) => {
  list.map(async (item) => {
    if (!item || !item.absence_start_date || !item.absence_end_date) return

    console.log(item)
    item.absence_start_date = new Date(
      convertDdmmyyyyToMmddyyyy(item.absence_start_date)
    )
    item.absence_end_date = new Date(
      convertDdmmyyyyToMmddyyyy(item.absence_end_date)
    )
    console.log(item)

    return await db.query(
      `INSERT INTO absence (absence_name, 
      site_id,
      mandatory,
      absence_start_date,
      absence_end_date) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [
        item.absence_name,
        item.site_id,
        item.mandatory,
        item.absence_start_date,
        item.absence_end_date
      ]
    )
  })
}

module.exports = {
  createAbsence,
  editAbsence,
  archiveSelectedAbsence,
  getAbsences,
  getAbsenceSites,
  importingAbsences
}
