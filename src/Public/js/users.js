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