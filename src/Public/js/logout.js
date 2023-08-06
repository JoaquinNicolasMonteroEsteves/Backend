const logout = (email) => {
    fetch(`/logout/${email}`,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        if(result.status === 201) {
            let lgt = confirm('Do you want to logout?')
            if (lgt) {setTimeout(()=>{
                window.location.replace('/users/login')
            }, 500)}
        }
    })
}