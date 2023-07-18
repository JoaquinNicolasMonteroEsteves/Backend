const upgradeUser = (email) => {
    fetch(`/users/premium/${email}`, {
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        if(result.status === 201) {
            result.json()
            alert("You account was successfully upgraded to Premium!")
            window.location.replace('/users')
        } else {
            alert("Upgrading-profile process failed.")
        }
    })
}

const restore = (email) => {
    fetch(`/users/restore/${email}`, {
        method:'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        if(result.status === 201) {
            result.json()
            alert(`Email was successfully sended to ${email}! Please, check your inbox`)
        } else {
            alert("Mailing process failed.")
        }
    })
}

// let restore_form = document.getElementById("restore-pass-form")

// restore_form.addEventListener('submit', e => {
//     e.preventDefault()
//     let data = new FormData(restore_form)
//     let obj = {}
//     data.forEach((value, key) => obj[key] = value)
//     fetch('/users/restore/new', {
//         method: 'POST',
//         body: JSON.stringify(obj),
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }).then(result => {
//         if(result.status === 201) {
//             result.json()
//             alert("Password was successfully updated. Please login to check all works!")
//             window.location.replace('/users/login')
//         } else if (result.status === 502) {
//             alert("Passwords must match. Please check the input")
//         } else if (result.status === 503){
//             alert("Your new password must be different to the existent password.")
//         } else {
//             alert('Change password process failed. Please try again in a minutes.')
//             window.location.replace('/users/login')
//         }
//     })
// })