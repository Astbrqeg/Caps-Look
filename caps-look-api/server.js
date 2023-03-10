// init an express app
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const router = require('./router')
const { errorConverter, errorHandler } = require('./middleware/error')
const helmet = require('helmet')
const fs = require('fs')

const app = express()
app.use(helmet())
const expressWinston = require('express-winston')
const { transports, format } = require('winston')
const logger = require('./logger')

const https = require('https')
const http = require('http')

// app.use(
//   expressWinston.logger({
//     winstonInstance: logger,
//     statusLevels: true
//   })
// )
// cors is a middleware that allows us to specify which domains are allowed to access our API

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000']
  })
)

const errmessage = format.printf(({ level, meta, timestamp }) => {
  return ` ${timestamp} ${level}: ${meta.message}`
})

app.use(
  expressWinston.errorLogger({
    transports: [new transports.Console({ level: 'error' })],
    format: format.combine(format.json(), format.timestamp(), errmessage)
  })
)

app.use(cookieParser())

// cors is a middleware that allows us to specify which domains are allowed to access our API
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000']
  })
)
app.use(express.json({ limit: '10MB' }))
app.use(express.urlencoded({ limit: '10MB', extended: false }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // Limit each IP to 1000 requests per windowMs
})
app.use(limiter)

app.use('/', router)

app.use(errorConverter)
app.use(errorHandler)

http.createServer(app).listen(process.env.PORT || 4000, function () {
  console.log('Listening on port http://localhost:4000 !')
})

https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    },
    app
  )
  .listen(4001, () => {
    console.log('Https server is runing at port 4001')
  })
