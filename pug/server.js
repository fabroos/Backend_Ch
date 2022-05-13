const express = require('express')
const app = express()
app.use(express.static('public'))
app.set('view engine', 'pug')
const port = 8080
const server = app.listen(port, () => {
  console.log(`App is running in http://localhost:${server.address().port}`)
})

app.get('/champs', (req, res) => {
  res.render('champs', {
    champs: [
      {
        name: 'Aatrox',
        id: 266
      },
      {
        name: 'Ahri',
        id: 103
      }
    ]
  })
})
