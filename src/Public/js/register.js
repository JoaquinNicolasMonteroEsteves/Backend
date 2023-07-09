let register_form = document.getElementById("registerForm")

register_form.addEventListener('submit', e => {
    e.preventDefault()
    let data = new FormData(register_form)
    let obj = {};
    data.forEach((value, key) => obj[key] = value)
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        if(result.status === 201) {
            result.json()
            alert("User was successfully created!")
            window.location.replace('/users/login')
        } else {
            alert("User could not be created")
        }
    })
})