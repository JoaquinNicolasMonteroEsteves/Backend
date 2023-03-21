import fs from 'fs'

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
            return this.#products
        }
        catch (error)
        {
            throw Error (`Error getting products, check ${this.#dirPath} exists. Detail: ${error}`)
        }
    }

    checkProperties = async (pro) => {
        if (!pro.title || !pro.description || !pro.price || !pro.thumbnail || !pro.code || !pro.stock || !pro.status || !pro.category) {
            return false
        }
        return true
        
    }

    addProduct = async (pdt) => {
        try
        {
            await this.checkDirOrPath()

            const checkCode = this.#products.find((product) => product.code == pdt.code)??0 //Operador nullish
            if (!checkCode) {
                
                if (this.checkProperties(pdt)) {
                    this.#products.length > 0 ? this.#id = this.#products.reduce((acc, curr) => curr.id > acc ? curr.id : acc, 0)+1 : this.#id = 0 
                    const newProduct = {title: pdt.title, description: pdt.description, price: pdt.price, thumbnail: pdt.thumbnail, code: pdt.code, stock: pdt.stock, status: pdt.status, category: pdt.category, id: this.#id}
                    this.#products = [...this.#products, newProduct]
                    await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
                    return newProduct
                }
                return "It is mandatory to complete all the fields."
            }
            else {
                return "Code already in use. Please change it for a new one"
            }
            
            
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
            if (foundProduct){
                return foundProduct
            }
            return `There is not an existing product with the ID ${id}`
        }
        catch (error)
        {
            throw Error(`Error getting product by id, check ${this.#dirPath} exists. Detail: ${error}`)
        }
    }

    updateProduct = async (id, properties, newValues) => {
        try
        {
            await this.checkDirOrPath()
    
            const foundProduct = this.#products.find((product) => product.id == id)??null
            if (foundProduct){
                let contains = true
                properties.forEach(x => {
                    let a = Object.keys(foundProduct).includes(x)
                    if(!a)
                    {contains = false}
                })
                if (!contains){return "Check for correct entries of properties keys or names."}
                properties.forEach(p => {
                    foundProduct[p] = newValues[properties.indexOf(p)]    
                })
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
                return foundProduct
            }
            return `There is not an existing product with the ID ${id}.`
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
                await fs.promises.writeFile(this.#path, JSON.stringify(this.#products))
                return foundProduct
            }
            return "The given id does not correspond to an existing product."
        }
        catch(error)
        {
            throw Error(`Error deleting product, check ${this.#dirPath} exists. Detail: ${error}`)
        }
    }
}

export default ProductManager

