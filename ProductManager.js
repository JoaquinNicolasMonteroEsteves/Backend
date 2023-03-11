const fs = require ("fs");


class ProductManager {
    #products;
    #dirPath;
    #path;
    #id;
    constructor() {
        this.#products = new Array();
        this.#id = 0;
        this.#dirPath = "./files";
        this.#path = this.#dirPath + "/Products.json";
    }

    checkDirOrPath = async () => {
        try
        {
            await fs.promises.mkdir(this.#dirPath, {recursive: true})

            if (!fs.existsSync(this.#path)) {
                await fs.promises.writeFile(this.#path, "[]")
            }
            
            let productsFile = await fs.promises.readFile(this.#path, "utf-8")
            this.#products = JSON.parse(productsFile)
        }
        catch (error)
        {
            throw Error(`An error occurred while running the app. Detail: ${error}`)
        }
    }

    getProducts = async () => {
        try
        {
            await this.checkDirOrPath()
            
            console.log(this.#products)
            return this.#products
        }
        catch (error)
        {
            throw Error (`Error getting products, check ${this.#dirPath} exists. Detail: ${error}`)
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try
        {
            await this.checkDirOrPath()

            const checkCode = this.#products.find((product) => product.code == code)??0 //Operador nullish
            if (!checkCode) {
                
                if (title != "" && description != "" && price != 0 && thumbnail != "" && code != "" && stock != 0) {
                    const newProduct = {title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id: this.#id} //lastID ? lastID++ : 0
                    this.#id++
                    this.#products = [...this.#products, newProduct]
                }
                else {
                    console.log("It is mandatory to complete all the fields.")
                }
                
            }
            else {
                console.error("Code already in use. Please change it for a new one")
            }
            
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
        }
        catch (error)
        {
            throw Error(`Error adding a new product, check ${this.#dirPath} exists. Detail: ${error}`)
        }
    }

    getProductById = async (id) => {
        try
        {
            await this.checkDirOrPath()

            const foundProduct = this.#products.find((product) => product.id == id)??null
            if (foundProduct) {
                console.log("Found product: ")
                console.log(foundProduct)
                return foundProduct
            } else {console.error("Product not found")}
        }
        catch (error)
        {
            throw Error(`Error getting product by id, check ${this.#dirPath} exists. Detail: ${error}`)
        }
    }

    updateProduct = async (id, property, newValue) => {
        try
        {
            await this.checkDirOrPath()
    
            const foundProduct = this.#products.find((product) => product.id == id)??null
            if (foundProduct) {
                foundProduct[property] = newValue
                console.log(foundProduct)
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
            }
            else {
                console.log(`Product with id = ${id} was not found.`)
            }
        }
        catch (error)
        {
            throw Error(`Error updating product, check ${this.#dirPath} exists. Detail: ${error}`)
        }
    }

    deleteProduct = async (id) => {
        try
        {
            await this.checkDirOrPath()
    
            const foundProduct = this.#products.find((product) => product.id == id)??null
            if(foundProduct) {
                this.#products.splice(foundProduct.id, 1)
            }
            else
            {
                console.log("The given id does not correspond to an existing product.")
            }
            
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))    
        }
        catch(error)
        {
            throw Error(`Error deleting product, check ${this.#dirPath} exists. Detail: ${error}`)
        }
    }
}

module.exports = ProductManager

