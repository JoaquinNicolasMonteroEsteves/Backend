let product_form = document.getElementById("add-product-form")

product_form.addEventListener('submit', e => {
    e.preventDefault()
    let data = new FormData(product_form)
    let obj = {}
    data.forEach((value, key) => obj[key] = value)
    console.log(obj);
    fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(result => {
        if(result.status === 201) {
            result.json()
            alert("Product added correctly")
            product_form.reset()
        } else {
            alert("Invalid product properties introduced")
        }
    })
})
