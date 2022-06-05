const socket = io.connect()

fetch('/api/products')
  .then(res => res.json())
  .then(res => renderProducts(res))

fetch('/api/messages')
  .then(res => res.json())
  .then(res => renderMessages(res))

// Productos 🎁 ===========================================================

const productTemplate = ({ title, price, image }) => `
            <tr>
              <td class="px-4 py-1 border text-gray-800">${title}</td>
              <td class="px-4 py-1 text-gray-800 border">
                $ ${price}
              </td>
              <td class="px-4 py-1 border text-gray-800">
                <img
                  src="${image}"
                  onerror="this.src='not-found.png'"
                  class="w-16 h-16"
                />
              </td>
            </tr>
`

const productsContainer = document.getElementById('products-container')
function renderProducts (products) {
  productsContainer.innerHTML =
    `<tr>
  <th class="px-4 pt-1 border font-semibold">Title</th>
  <th class="px-4 pt-1 border font-semibold">Price</th>
  <th class="px-4 pt-1 border font-semibold">Image</th>
</tr>` + products.map(productTemplate).join('')
}

socket.on('product', products => {
  renderProducts(products)
})

class product {
  constructor (name, price, image) {
    this.title = name
    this.price = price
    this.image = image
    this.id = `${Date.now()}`
  }
}

function addProduct (product) {
  socket.emit('product', product)
}

const productsForm = document.getElementById('product-form')
productsForm.addEventListener('submit', e => {
  e.preventDefault()
  const form = new FormData(e.target)
  const newProduct = new product(
    form.get('title'),
    form.get('price'),
    form.get('image')
  )
  addProduct(newProduct)
  e.target.reset()
})

// Messages 📪 ===========================================================
const messagesContainer = document.getElementById('messages-container')
const messageTemplate = ({ message, date, email }) => `
            <article class="flex border px-4 py-2 text-xs my-1 flex-col md:flex-row">
              <div class="flex mr-10 flex-wrap">
                <p class="mr-2 font-bold text-blue-500">${email}</p>
                <span class="text-orange-600 font-xxs">${date}</span>
              </div>
              <p class="text-green-600">${message}</p>
            </article>
`

socket.on('post message', messages => {
  renderMessages(messages)
})

class Message {
  constructor (name, message) {
    this.email = name
    this.message = message
    this.timestamp = `${Date.now()}`
    this.id = `${Date.now()}`
  }
}

function addMessage (message) {
  socket.emit('message', message)
}

function renderMessages (messages) {
  messagesContainer.innerHTML = messages
    .map(({ message, email, timestamp }) =>
      messageTemplate({
        message,
        email,
        date: Date(timestamp).toLocaleString()
      })
    )
    .join('')
}

document.getElementById('message-form').addEventListener('submit', e => {
  e.preventDefault()
  const message = new Message(e.target.email.value, e.target.message.value)
  addMessage(message)
})
