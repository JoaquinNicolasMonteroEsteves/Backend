import { log } from 'console';
import fs from 'fs'

class CartManager {
    #carts;
    #dirPath;
    #path;
    #id;
    #productsPath;
    #products;
    constructor() {
        this.#carts = new Array();
        this.#id = 0;
        this.#dirPath = "./files";
        this.#path = this.#dirPath + "/Carts.json"
        this.#productsPath = this.#dirPath + "/Products.json"
        this.#products
    }

    checkDirOrPath = async () => {
        try
        {
            await fs.promises.mkdir(this.#dirPath, {recursive: true})

            if (!fs.existsSync(this.#path)) {
                await fs.promises.writeFile(this.#path, "[]")
            }
            
            let cartsFile = await fs.promises.readFile(this.#path, "utf-8")
            this.#carts = JSON.parse(cartsFile)
        }
        catch (error)
        {
            throw Error(`An error occurred while running the app. Detail: ${error}`)
        }
    }

    ckeckProductsFile = async () => {
        try
        {
            await fs.promises.mkdir(this.#dirPath, {recursive: true})

            if(!fs.existsSync(this.#productsPath)){
                return `Please check the /api/products functionalities first.`
            }

            let productsFile = await fs.promises.readFile(this.#productsPath, "utf-8")
            this.#products = JSON.parse(productsFile)
            return this.#products
        }
        catch(error)
        {
            throw Error (`An error occurred while running the app. Detail: ${error}`)
        }
    }

    getCartById = async (id) => {
        try
        {
            await this.checkDirOrPath()
            const foundCart = this.#carts.find((cart) => cart.id == id)??null
            if (foundCart){
                return foundCart
            }
            return `There is not an existing cart with the ID ${id}`
        }
        catch (error)
        {
            throw Error(`Error getting product by id. Check if ${this.#dirPath} exists. Detail: ${error}`)
        }
    }

    addCart = async () => {
        try
        {
            await this.checkDirOrPath()

            this.#carts.length > 0 ? this.#id = this.#carts.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0)+1 : this.#id = 0 
            const newCart = {id: this.#id, products: []}
            this.#carts = [...this.#carts, newCart]
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts))
            return newCart
        }
        catch (error)
        {
            throw Error(`Error adding a new cart. Check if ${this.#dirPath} exist. Detail: ${error}`)
        }
    }

    deleteProductFromCart = async (cartId, productId) => {
        try
        {
            await this.checkDirOrPath()
            await this.ckeckProductsFile()
            let cart = this.#carts.find((c) => c.id == cartId)??null
            let product = this.#products.find(p => p.id == productId)??null
            if (cart && product) {
                let productInCart = cart.products.find(p => p.id == productId)??null
                if(productInCart) {
                    cart.products.splice(cart.products.indexOf(productInCart), 1)
                    await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts))
                    return `Product "${product.title}" was successfully deleted from the cart with ID ${cart.id}`
                }
                return `Product "${product.title}" is not in this cart.`
            }
            return `Check if there is an existing cart with ID ${cartId} or product with ID ${productId}`
        }
        catch (error)
        {
            throw Error (`Error deleting a product. Detail: ${error}`)
        }
    }


    addProductToCart = async (cartId, productId) => {
        try 
        {
            await this.checkDirOrPath()
            let exists = await this.ckeckProductsFile()
            if (!(typeof(exists) == "string")){
                let cart = this.#carts.find((c) => c.id == cartId)??null
                let product = this.#products.find(p => p.id == productId)??null
                if (cart && product) {
                    let productInCart = cart.products.find(p => p.id == productId)??null
                    if(!productInCart) {
                        let newProduct = {id: productId, quantity: 1}
                        cart.products.push(newProduct)
                        await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts))
                        return `Product "${product.title}" was successfully added to the cart (ID: ${cart.id})`
                    }
                    else {
                        productInCart.quantity = productInCart.quantity+1
                        await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts))
                        return `1 unit of "${product.title}" was added to the cart. Actual count: ${productInCart.quantity}`
                    }
                }
                return `Check if there is an existing cart with ID ${cartId} or product with ID ${productId}`
            }
            return exists
        }
        catch(error)
        {
            throw Error (`Error adding a product. Check if ${this.#dirPath} exists. Detail: ${error}`)
        }
    }
}

export default CartManager