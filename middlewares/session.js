import session from 'express-session'
import MongoStore from 'connect-mongo'
const mongoUrl = process.env.MONGODB_URI

export const sessionHandler = session({
  // store: new FileStore({ path: './sessions', ttl: 300, retries: 0 }),
  store: MongoStore.create({
    mongoUrl,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }),
  secret: 'token',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 600_000
  }
})
