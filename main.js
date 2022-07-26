import server from './server.js'
import { port, mode } from './args.js'
import { fork } from 'child_process'
import cluster from 'cluster'
import os from 'os'
import { testRouter } from './router/testRouter.js'

if (mode === 'fork') {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
} else if (mode === 'cluster') {
  if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork()
    }
  } else {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
    console.log(`Worker ${process.pid} started`)
  }
}
