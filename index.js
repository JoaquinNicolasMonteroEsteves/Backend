//Guía de testing
import ProductManager from "./src/ProductManager.js";
let productManager = new ProductManager();

let checkProductManager = async () => {
    await productManager.addProduct("Producto 11", "Este es un producto prueba", 200, "Sin imagen", "abc0011", 25)
    // await productManager.addProduct("Producto 2", "Este es un producto prueba", 100, "Sin imagen", "abc222", 15)
    // await productManager.addProduct("Producto 3", "Este es un producto prueba", 50, "Sin imagen", "abc333", 5)
    // await productManager.addProduct("Producto 4", "Este es un producto prueba", 150, "Sin imagen", "abc444", 20)
    // await productManager.addProduct("Producto 5", "Este es un producto prueba", 75, "Sin imagen", "abc555", 8)
    // await productManager.addProduct("Producto 6", "Este es un producto prueba", 125, "Sin imagen", "abc666", 18)
    // await productManager.addProduct("Producto 7", "Este es un producto prueba", 20, "Sin imagen", "abc777", 3)
    // await productManager.addProduct("Producto 8", "Este es un producto prueba", 45, "Sin imagen", "abc888", 6)
    // await productManager.addProduct("Producto 9", "Este es un producto prueba", 300, "Sin imagen", "abc999", 30)
    // await productManager.addProduct("Producto 10", "Este es un producto prueba", 260, "Sin imagen", "abc000", 28)

}

checkProductManager();
