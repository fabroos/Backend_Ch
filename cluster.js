import cluster from 'cluster'
import os from 'os'
import { createServer } from 'http'

createServer((req, res) => {
  res.writeHead(200)
  res.end(`Hello from worker ${process.pid} on nache`)
}).listen(process.env.PORT || 8000)
