const socket = io()
socket.emit('request messages')
// Plantilla para el mensajes

const id = localStorage.getItem('id') || Date.now()
localStorage.setItem('id', id)

const externalMessage = ({ msg, img }) => {
  return `<div class="chat-message">
    <div class="flex items-end">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
      >
        <div>
          <span
            class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
            >${msg}</span
          >
        </div>
      </div>
      <img
        src="${img}"
        alt=""
        class="w-6 h-6 rounded-full order-1"
      />
    </div>
  </div>`
}

const propietaryMessage = ({ msg, img }) => {
  return `<div class="chat-message">
    <div class="flex items-end justify-end">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
      >
        <div>
          <span
            class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white "
            >${msg}</span
          >
        </div>
      </div>
      <img
        src="${img}"
        alt=""
        class="w-6 h-6 rounded-full order-2"
      />
    </div>
  </div>`
}

const user = {
  name: localStorage.getItem('name') || window.prompt('Ingresa tu nombre'),
  img: localStorage.getItem('img') || window.prompt('Ingresa tu imagen')
}
localStorage.setItem('name', user.name)
localStorage.setItem('img', user.img)
document.getElementById('name').textContent = user.name
document.getElementById('img').src = user.img

// Messages
let messages = []
const messagesContainer = document.getElementById('messages')

socket.on('chat message', msgs => {
  messagesContainer.innerHTML = msgs
    .map(msg => (id === msg.id ? propietaryMessage(msg) : externalMessage(msg)))
    .join('')
  messagesContainer.scrollTop = messagesContainer.scrollHeight
})

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault()
  e.stopPropagation()
  const msg = document.getElementById('input-message').value
  socket.emit('chat message', {
    msg,
    img: user.img,
    author: user.name,
    id: id
  })
  e.target.reset()
})

document.getElementById('resetName').addEventListener('click', e => {
  localStorage.removeItem('name')
  localStorage.removeItem('img')
  window.location.reload()
})
