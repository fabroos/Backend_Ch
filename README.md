# Cookies

## How to use cookies in server

To use cookies in server, you need a middleware to handle cookies.

```js
const cookieParser = require('cookie-parser')

app.use(cookieParser())
```

## Cookies problems

Cookies are used to store information about the user.
The information is stored in the browser and is sent to the server.
The problem is, that in client you can set cookies, and send false information to the server.

example:

- Client sets cookie with name "name" and value "John"
- Client sends request to server with cookie "name" and value "John"
- Server checks if cookie "name" is set and if it is, it checks if the value is "John"
- If the value is not "John", the server sends a response with status code 400 and a message "Bad Request"
- If the value is "John", the server sends a response with status code 200 and a message "OK"

Ok but in the client you can set cookies with wrong information.

suppose a client with $0 but know Jhon that has $100
so the bad client can set a cookie with name "name" and value "John"
and the server will check if the cookie "name" is set and if it is, it checks if the value is "John"

## Method of securing cookies

First, you need to set a encryption method.

```js
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

app.use(cookieParser('secret'))

app.get('/', (req, res) => {
  const user = req.body.user
  if (validateUser(user)) {
    res.send('OK')
  } else {
    res.status(400).send('Bad Request')
  }
  res.send('Cookie set')
})
```

## using express-session

```js
import session from 'express-session'

const app = express()

app.use(
  session({
    secret: 'secret', // key used to encrypt the cookie
    resave: false, // default: true, if set to false, the session will only be saved if it was modified since the last request
    saveUninitialized: false // default: true, if set to false, the session will not be saved if it is new or unmodified since the last request
  })
)
```

```js
const auth = async (req, res, next) => {
  if (await userDbGetUser(req.session.user)) {
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}

app.get('/login', (req, res) => {
  const user = req.body.user
  if (user.name === 'John' && user.password === '123') {
    req.session.user = user
    res.send('OK')
  } else {
    res.status(400).send('Bad Request')
  }
  res.send('OK')
})

app.get('/', auth, (req, res) => {
  res.send('OK')
})
```

```

```
