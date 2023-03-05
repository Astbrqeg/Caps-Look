/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createType('cost_level_enum', ['low', 'medium', 'high'])
  pgm.addColumns('site', {
    cost_level: { type: 'cost_level_enum', default: 'low' }
  })
  pgm.sql("Update site SET cost_level='medium' where site_name='Nazareth' ")
  pgm.sql("Update site SET cost_level='high' where site_name='Pune' ")
  pgm.sql(
    'Update project SET planned_site_mix=\'{"low":"20","medium":"10","high":"2"}\' where project_name=\'VR\' '
  )
  pgm.sql(
    'Update project SET planned_site_mix=\'{"low":"8","medium":"4","high":"1"}\' where project_name=\'ARM\' '
  )
  pgm.sql(
    'Update project SET planned_site_mix=\'{"low":"10","medium":"12","high":"4"}\' where project_name=\'SES\' '
  )
  pgm.sql(
    'Update project SET planned_site_mix=\'{"low":"12","medium":"3","high":"3"}\' where project_name=\'OPTIMA\' '
  )
}

exports.down = (pgm) => {
  pgm.dropColumns('site', 'cost_level')
  pgm.dropType('cost_level_enum')
}
