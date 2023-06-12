const deleteProduct = (cartID, productID) => {
    fetch(`/api/carts/${cartID}/products/${productID}`, { 
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }).then((response) => {
        if(response.ok) {
          window.location.reload()
        } else {
          console.error('Error while deleting product from cart!')
        }
      })
}

const addProductUnit = (cartID, productID) => {
    fetch(`/api/carts/${cartID}/products/${productID}`, { 
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        }
      }).then((response) => {
        if(response.ok) {
          window.location.reload()
        } else {
          console.error('Error while adding a unit to the product')
        }
      })
}

const subtractProductUnit = (cartID, productID) => {
    fetch(`/api/carts/${cartID}/products/${productID}/unit`, { 
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }).then((response) => {
        if(response.ok) {
          window.location.reload()
        } else {
          console.error('Error while deleting product unit from cart!')
        }
      })
}

const addProductToCart = (cartID, productID, productTitle) => {
    fetch(`/api/carts/${cartID}/products/${productID}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        if(response.ok) {
            alert(`1 unit of ${productTitle} was successfully added to the cart`)
        } else {
            console.error('Error while trying to add a unit to the cart');
        }
    })
}

const purchaseCart = (cartID) => {
    fetch(`api/carts/${cartID}/purchase`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    }).then((response) => {
        if(response.ok) {
            response.json()
            .then(ticket => {
                alert(`Your ticket with code: ${ticket.code} was successfully generated. Thanks for buying! You can check non-stock products will remain in your cart.`);
                setTimeout(() => {
                    window.location.replace('/current')
                }, 500)
            })
        } else {
            console.error('Error while preparing the purchase')
        }
    })
}