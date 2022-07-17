import { Router } from 'express'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.get('/', auth, (req, res) => {
  res.sendFile('index.html', { root: './pages' })
})

router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './pages' })
})

router.get('/register', (req, res) => {
  res.sendFile('register.html', { root: './pages' })
})

router.get('/info', (req, res) => {
  res.json({
    args: process.argv.slice(2),
    so: process.platform,
    nodeVersion: process.version,
    rss: process.memoryUsage().rss,

    processId: process.pid,
    folderProyect: process.cwd()
  })
})
export { router as webRouter }
