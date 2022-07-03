import { Router } from 'express'
const router = Router()

router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'username or password is missing', status: 400 })
  }
  req.session.email = email
  req.session.admin = email === 'admin@admin.com' && password === 'admin'
  return res.json({
    message: 'login success',
    status: 200
  })
})

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) res.status(500).json({ status: 'logout err', body: err })
    else res.status(200).json({ status: 'logout success' })
  })
})

export { router as authRouter }
