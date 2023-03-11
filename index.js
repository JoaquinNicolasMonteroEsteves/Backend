//Guía de testing
const ProductManager = require("./ProductManager.js")
let productManager = new ProductManager();

let checkProductManager = async () => {
    await productManager.getProducts()
    await productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
    await productManager.getProducts()
    await productManager.getProductById(0)
    await productManager.updateProduct(0, "description", "Este producto está modificado")
    await productManager.deleteProduct(0)
}

checkProductManager();
