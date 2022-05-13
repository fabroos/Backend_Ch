const express = require('express')
const router = express.Router()
const app = express()
const controller = require('./controller.js')
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})

app.on('error', err => {
  console.log(err.message)
})

router.get('/', (req, res) => {
  res.send(`<h1>Hello World</h1>
    <p>This is a simple API</p>
    <ul>
        <li><a href="/api/products">/api/products</a></li>
    </ul>`)
})

router.get('/products', controller.getAll) // ✅
router.get('/products/:id', controller.getById) // ✅
router.post('/products', controller.create) // ✅
router.put('/products/:id', controller.update) // ✅
router.delete('/products/:id', controller.deleteById) // ✅

app.use('/api', router)
