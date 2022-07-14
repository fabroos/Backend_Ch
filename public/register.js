const $ = document.querySelector.bind(document)
const form = $('form')
form.addEventListener('submit', function (e) {
  e.preventDefault()
  const email = $('#email').value
  const password = $('#password').value
  const data = { email, password }
  fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      if (res.status === 200) {
        window.location.href = '/'
      } else {
        $('.error').innerHTML = res.message
      }
    })
    .catch(err => {
      $('.error').innerHTML = err
    })
})
