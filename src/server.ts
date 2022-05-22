import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

console.log('hello')

interface User {
  name: string
  age: number
}

const users: User[] = []

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', (req, res) => {
  users.push(req.body)
  res.json(users)
})
