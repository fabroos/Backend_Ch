import passport from 'passport'

const registerControler = passport.authenticate('register', {
  successRedirect: '/auth/successRegister',
  failureRedirect: '/auth/failureRegister',
  failureMessage: true
})

const loginControler = passport.authenticate('login', {
  successRedirect: '/auth/successLogin',
  failureRedirect: '/auth/failureLogin',
  failureMessage: true,
  successMessage: true
})

const authController = {
  successRegister: (req, res) => {
    res.status(200).json({
      message: 'Usuario creado correctamente',
      status: 200
    })
  },
  failureRegister: (req, res) => {
    // get the error message from done passport

    const error = req.session.messages.pop()
    console.log(error)
    res.status(400).json({
      message: error,
      status: 400
    })
  },
  successLogin: (req, res) => {
    res.status(200).json({
      message: 'Usuario autenticado correctamente',
      status: 200
    })
  },
  failureLogin: (req, res) => {
    res.status(400).json({
      message: req.session.messages.pop(),
      status: 400
    })
  },
  logout: (req, res) => {
    if (req.isAuthenticated()) {
      req.logout(err => {
        console.error(err)
      })
    }
    return res.status(200).json({
      message: 'Usuario desautenticado correctamente',
      status: 200
    })
  }
}

export { registerControler, loginControler, authController }
