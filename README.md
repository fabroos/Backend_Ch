# Notas

## MongoDB

## Mongodb official driver

## Mongooose odm

Odm (Object Document Mapper)

es una libreria de js, que por debajo usa mongodb como driver.

### Forma 1

```js
await mongoose.connect(
  'mongodb+srv://cluster0.fkfefba.mongodb.net/myFirstDatabase?user=coderHouse&password=Q0o9V6pNU1rf9dxW'
)

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String, required: true },
  timestamp: { type: Number, required: true }
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false }
})

const messagesDb = mongoose.model('message', messageSchema)
const productsDb = mongoose.model('product', productSchema)

productsDb.create({
  name: 'iPhone',
  price: 12123,
  image: 'https://cdn.mos.cms.futurecdn.net/9c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8.jpg'
})
```

### Forma 2

```js
// Mongose

import mongoose from 'mongoose'

await mongoose.connect(
  'mongodb+srv://cluster0.fkfefba.mongodb.net/myFirstDatabase?user=coderHouse&password=Q0o9V6pNU1rf9dxW'
)

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  email: { type: String, required: true },
  timestamp: { type: Number, required: true }
})

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false }
})

const messagesDb = mongoose.model('message', messageSchema)
const productsDb = mongoose.model('product', productSchema)

productsDb.create({
  name: 'iPhone',
  price: 12123,
  image: 'https://cdn.mos.cms.futurecdn.net/9c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8.jpg'
})
```

## Mongo db

```js
// new mongodb in cloud

const user = 'coderhouse'
const password = 'coderhouse'

import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = `mongodb+srv://${user}:${password}@cluster0.fkfefba.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})

try {
  await client.connect()
  const messages = client.db('messages').collection('messages')
  await messages.insertOne({
    message: 'Hello',
    email: 'juan@mail.com',
    timestamp: Date.now()
  })
  console.log(await messages.find({}).toArray())
} catch (err) {
  console.log(err)
} finally {
  client.close()
}
```

### Firebase

```js
// Firebase

// creamis un proyecto en firebase
// crear una cuenta en firebase

// craemos una firestore en firebase

import admin, { firestore } from 'firebase-admin'
import fs from 'fs'

const serviceAccount = JSON.parse(
  fs.readFileSync(
    './coderhousebackend-3c2c8-firebase-adminsdk-x3svk-243d5c5330.json'
  )
)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

//traemos el firestore

const db = admin.firestore()

const dbMessages = db.collection('messages')

// insertamos un mensaje
const message = await dbMessages.add({
  message: 'Hello',
  email: 'asdas@assda.com',
  timestamp: Date.now()
}) // retorna mucas cosas

const doc = await dbMessages.doc(message.id).get() // retorna un documento

console.log({ id: doc.id, ...doc.data() })
// para acceder a los datos del documento
// debemos usar el metodo data(), para el id del documento el id

// updatemos un documento

await dbMessages.doc(message.id).set({
  message: 'Cambiado',
  email: 'cambiado@gmail.com'
})

// eliminamos un documento

await dbMessages.doc(message.id).delete()

// traemos todos los documentos

const res = []
const snapshot = await dbMessages.get() // esto es un objeto que a travez de un forEach nos va a iterar sobre todos los documentos
// obligatoriante debemos usar el metodo forEach() ya que es un metodo de lo que nos devuelve firestore

snapshot.forEach(doc => {
  res.push({ id: doc.id, ...doc.data() })
})
console.log(res)

// borrramos todos los documentos
// version eficiente
const batch = db.batch()
snapshot.forEach(doc => {
  batch.delete(doc.ref)
})
await batch.commit()

// version mas simple

const ref = firestore.collection('messages')
ref.onSnapshot(snapshot => {
  snapshot.docs.forEach(doc => {
    ref.doc(doc.id).delete()
  })
})
```
