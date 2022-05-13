const express = require('express')
const handlebars = require('express-handlebars')
const hbs = new handlebars()
const app = express()
const port = 8080

app.listen(port, () =>
  console.log(`
App listening on port ${port}!
Press Ctrl+C to quit.
the app is running on http://localhost:${port}
`)
)
app.engine(
  'hbs',
  hbs({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials'
  })
)
app.set('views', './views')
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    message: 'Welcome to the home page!'
  })
})

const user = {
  name: 'John',
  age: 30
}

app.get('/user', (req, res) => {
  res.render('user', user)
})
