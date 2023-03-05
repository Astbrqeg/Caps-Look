/* eslint-disable camelcase */

const { dropColumns } = require('node-pg-migrate/dist/operations/tables')

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.addColumns('employee', {
    isarchived: { type: 'boolean', default: false }
  })
  pgm.addColumns('scrum', { isarchived: { type: 'boolean', default: false } })
  pgm.addColumns('project', { isarchived: { type: 'boolean', default: false } })
  pgm.addColumns('site', { isarchived: { type: 'boolean', default: false } })
  pgm.addColumns('absence', { isarchived: { type: 'boolean', default: false } })
}

exports.down = (pgm) => {
  pgm.dropColumns('employee', 'isarchived')
  pgm.dropColumns('scrum', 'isarchived')
  pgm.dropColumns('project', 'isarchived')
  pgm.dropColumns('site', 'isarchived')
  pgm.dropColumns('absence', 'isarchived')
}
