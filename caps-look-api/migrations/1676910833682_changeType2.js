/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.alterColumn('employee', 'productivity', {
    type: 'VARCHAR(10)',
    notNull: false
  })
  pgm.alterColumn('employee', 'id_number', {
    type: 'VARCHAR(15) ',
    UNIQUE: true
  })
  pgm.alterColumn('employee', 'email', { type: 'VARCHAR(50) ', UNIQUE: true })
  pgm.alterColumn('project', 'project_name', {
    type: 'VARCHAR(15)',
    UNIQUE: true
  })
}

exports.down = (pgm) => {
  pgm.alterColumn('employee', 'productivity', {
    type: 'VARCHAR (10)',
    notNull: true
  })
  pgm.alterColumn('employee', 'id_number', {
    type: 'VARCHAR(50)',
    UNIQUE: false
  })
  pgm.alterColumn('employee', 'email', { type: 'TEXT', UNIQUE: false })
  pgm.alterColumn('project', 'project_name', {
    type: 'VARCHAR(255)',
    UNIQUE: false
  })
}
