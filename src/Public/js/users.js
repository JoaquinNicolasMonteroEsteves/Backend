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