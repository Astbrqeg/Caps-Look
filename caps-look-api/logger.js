const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.Console({ level: 'error' }),
    new transports.Console({ level: 'warn' })
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.prettyPrint()
  )
})

module.exports = logger
