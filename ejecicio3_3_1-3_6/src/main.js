console.clear()
const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const personRoutes = require('./routes/person.routes')

const app = express()
const server = http.createServer(app)

const PORT = process.env.PORT ?? 3001

app.use(express.json({ extended: false }))

app.use(morgan('tiny'))

app.use(cors({ methods: ['POST', 'DELETE', 'PATCH', 'GET'] }))

app.use('/api/persons', personRoutes)

server.listen(PORT, () => {
  console.log(`Local: http://localhost:${PORT}`)
})