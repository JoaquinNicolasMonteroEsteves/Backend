let login_form = document.getElementById("loginForm")

login_form.addEventListener('submit', e => {
    e.preventDefault()
    let data = new FormData (login_form)
    let obj = {}
    data.forEach((value,key) => obj[key] = value)
    fetch('/api/sessions/login', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(result => {
      if(result.ok) {
        result.json()
        .then(json => {
          localStorage.setItem('authToken', json.access_token)
          localStorage.setItem('USER_ID', json.id)
          alert('Successfull login!')
          window.location.replace('/users/profile')
        })
      } else {
        return result.json().then((error) => {
          console.log(error)
          console.log(error.message)
          alert('Invalid login: ' + error.message)
          window.location.reload()
        })
      }
    })
  })
  