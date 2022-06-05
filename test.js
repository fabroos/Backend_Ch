// // tests

// fetch('http://localhost:8080/api/products')
//   .then(res => res.json())
//   .then(data => console.log('all:', data))

// // get by id
// // fetch('http://localhost:8080/api/products/1')
// //   .then(res => res.json())
// //   .then(data => console.log(data))

// // post

// // fetch('http://localhost:8080/api/products', {
// //   method: 'POST',
// //   headers: {
// //     'Content-Type': 'application/json'
// //   },
// //   body: JSON.stringify({
// //     name: `producto nuevo ${Math.floor(Math.random() * 100)}`,
// //     price: Math.random() * 100,
// //     image: 'test.j pg'
// //   })
// // })

// // put

// fetch('http://localhost:8080/api/products/1', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: `producto nuevo ${Math.floor(Math.random() * 100)}`
//   })
// })
//   .then(res => res.json())
//   .then(data => console.log(data))

// //   delete

// fetch('http://localhost:8080/api/products/1', {
//   method: 'DELETE'
// })
//   .then(res => res.json())
//   .then(data => console.log(data))

// messages

// get all
fetch('http://localhost:8080/api/messages')
  .then(res => res.json())
  .then(data => console.log(data))

// get by id

// fetch('http://localhost:8080/api/messages/3')
//   .then(res => res.json())
//   .then(data => console.log(data))

// post

fetch('http://localhost:8080/api/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: `fabrizio@gmail.com`,
    message: `hola`
  })
})
