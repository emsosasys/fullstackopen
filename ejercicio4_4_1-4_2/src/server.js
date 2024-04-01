import http from 'http'
import { initDatabase } from './database/config.js'
import { app } from './app.js'

const PORT = process.env.PORT ?? 8080

const server = http.createServer(app)

console.clear()

server.listen(PORT, () => {
  console.log(`💻 Local: http://localhost:${PORT}`)
  void initDatabase()
})