const form = document.getElementById('roleForm')

form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => obj[key] = value)
  fetch('/users/update', {
    method: 'PUT',
    body: JSON.stringify(obj),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(result => {
    if (result.ok) {
      result.json().then((response) => {
        alert(response.message)
        window.location.reload()
      })
    } else {
      result.json().then((response) => {
        alert(response.message)
      })
    }
  }).catch((error) => {
    alert('An error ocurred: ' + error)
  })
})