import bcrypt from 'bcrypt'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { UsersContainer } from '../Containers/UsersContainer.js'
const users = new UsersContainer()
const saltRounds = 10

function validateMail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function validatePassword (password) {
  return password.length >= 6
}

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password'
    },
    async (req, email, password, done) => {
      if (!validateMail(req.body.email))
        return done(null, false, { message: 'El email no es valido' })
      if (!validatePassword(req.body.password))
        return done(null, false, {
          message: 'La contraseña debe tener al menos 6 caracteres'
        })
      const user = await users.obtenerUsuarioPorMail(email)
      if (user) {
        return done(null, false, { message: 'El usuario ya existe' })
      }
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          const data = { email, password: hash }
          await users.guardar(data)
          return done(null, data)
        })
      })
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password'
    },
    async (req, email, password, done) => {
      try {
        const user = await users.obtenerUsuarioPorMail(email)
        if (!user) return done(null, false, { message: 'User not found' })
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            return done(null, user, { message: 'Login success' })
          }
          return done({ message: 'credentials are invalid' })
        })
      } catch (error) {
        return done(null, false)
      }
    }
  )
)

export const passportMiddleware = passport.initialize()

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await users.listar(id)
  done(null, user)
})

export const passortSessionMiddleware = passport.session()
