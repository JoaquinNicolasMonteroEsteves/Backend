let uploadDocs_form = document.getElementById("uploadDocs-form")

uploadDocs_form.addEventListener('submit', e => {
    e.preventDefault()
    let email = uploadDocs_form.name
    let data = new FormData(uploadDocs_form)
    fetch(`/users/${email}/documents`, {
        method: 'POST',
        body: data
    }).then(result => {
        if(result.ok && result.status === 201) {
            alert("Files were successfully uploaded!")
            setTimeout(()=>{
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
            }, 1500)
        }
    }).catch(error => {
        alert(`An error ocurred: ${error.message}`)
    })
})


// fetch(`/users/premium/${email}`, {
//     method:'POST',
//     headers: {
//         'Content-type': 'application/json'
//     }
// }).then(result => {
//     if(result.status === 201) {
//         result.json()
//         alert("You account was successfully upgraded to Premium!")
//         window.location.replace('/users')
//     } else {
//         alert("Upgrading-profile process failed.")
//     }
// })