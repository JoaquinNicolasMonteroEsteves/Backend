const deleteProductPermanently = async (productID, owner) => {
    await fetch(`/api/products/${productID}`, {
        method:'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((result) => {
        if(result.status === 201) {
            result.json().then(result2 => {
            if(result2.owner === "admin") {
                alert("Admin product was succesffuly deleted!")
                window.location.replace('/products')
            }
            else {
                fetch(`/api/emails/${owner}/${result2.title}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then((response) => {
                    if(response.status === 201) {
                        alert(`The product ${result2.title} was deleted and an email sent to ${owner}`)
                        window.location.replace('/products')
                    }
                })
            }
            })
        }
    }).catch((error) => {
        console.log(error);
    })
}