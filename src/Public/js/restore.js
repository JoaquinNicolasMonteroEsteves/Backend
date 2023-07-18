let restore_form = document.getElementById("restore-pass-form")
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const token = urlParams.get('token')

restore_form.addEventListener('submit', e => {
    e.preventDefault()
    let data = new FormData(restore_form)
    let obj = {}
    data.forEach((value, key) => obj[key] = value)
    fetch(`/users/restore/new?token=${token}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        if(result.ok) {
            result.json()
            alert("Password was successfully updated. Please login to check all works!")
            window.location.replace('/users/login')
        } else {
            return result.json().then((error) => {
                console.log(error.detail)
                alert(error.message)
              })
        }
    }).catch((error => {
        alert('An error ocurred: ' + error.message)
    }))
})