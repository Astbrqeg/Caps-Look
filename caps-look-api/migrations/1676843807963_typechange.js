/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.alterColumn('absence', 'mandatory', { type: 'VARCHAR(10)' })
}

exports.down = (pgm) => {
  pgm.alterColumn('absence', 'mandatory', { type: 'boolean', deafult: 'false' })
}
