const form = document.getElementById("logoutForm")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch('/logout',  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        if(result.status === 200) {
            let lgt = confirm('Do you want to logout?')
            if (lgt) {setTimeout(()=>{
                window.location.replace('/users/login')
            }, 500)}
            
        }
    })
})