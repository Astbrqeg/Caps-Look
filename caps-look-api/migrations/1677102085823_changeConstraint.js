/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.alterColumn('employee', 'phone', { type: 'VARCHAR(10)', notNull: false })
}
exports.down = (pgm) => {
  pgm.alterColumn('employee', 'phone', { type: 'VARCHAR (10)', notNull: true })
}
