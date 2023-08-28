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

const deleteUser = (email) => {
    let a = confirm("Está seguro que desea eliminar este usuario?")
    if (a) {
        fetch(`/users/${email}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        }).then((response) => {
          if(response.ok) {
            response.json().then((result) => {
              alert(result.message)
              window.location.reload()
            })
          } else {
            console.error('Error trying to delete user!')
          }
        })
    }
  }

  const deleteIdleUsers = () => {
    fetch('/users/', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    }).then((response) => {
      if(response.ok) {
        response.json().then((result) => {
          alert(result.message)
          window.location.reload()
        })
      } else {
        console.error('Error trying to delete idle users!')
      }
    })
  }