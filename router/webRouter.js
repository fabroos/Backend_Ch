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
export { router as webRouter }
