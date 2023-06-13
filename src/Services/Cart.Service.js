import { create_hash } from "../utils.js"
import cartModel from "./models/cartModel.js"
import productModel from "./models/product.model.js"
import ticketModel from "./models/ticket.model.js"
import userModel from "./models/user.model.js"
import ProductService from "./Product.Service.js"

const PS = new ProductService()

export default class CartService {

    getCartById = async (cartId) => {
        try
        {
            let cart = await cartModel.findOne({_id: cartId}).populate("products")
            return cart.toObject()
        }
        catch (error)
        {
            return (`Error getting product by id. Check ypur connection. Detail: ${error}`)
        }
    }

    addProductToCart = async (cartId, productId) => {
        try 
    {
            let cart = await cartModel.findOne({_id: cartId})
            let product = await productModel.findOne({_id: productId})
            let productInCart = cart.products.find(p => p.product._id == productId)??null
            if(!productInCart) {
                let newProduct = {product: productId, quantity: 1}
                cart.products.push(newProduct)                
                await cartModel.findByIdAndUpdate({_id: cartId},cart)
                return `Product "${product.title}" was successfully added to the cart (ID: ${cart.id})`
            }
            else {
                productInCart.quantity = productInCart.quantity+1
                await cartModel.findByIdAndUpdate({_id: cartId},cart)
                return `1 unit of "${product.title}" was added to the cart. Actual count: ${productInCart.quantity}`
            }
        }
        catch(error)
        {
           return (`Error adding a product. Check your connection. Detail: ${error}`)
        }
    }

    subtractProductUnit = async (cartId, productId) => {
        try 
        {
            let cart = await cartModel.findOne({_id: cartId})
            let productInCart = cart.products.find(p => p.product._id == productId)
            if(productInCart.quantity > 1)
            {
                productInCart.quantity = productInCart.quantity-1
                await cartModel.findByIdAndUpdate({_id: cartId},cart)
                return `1 unit of "${productInCart.title}" was subtracted from the cart. Actual count: ${productInCart.quantity}`
            }
        }
        catch(error)
        {
           return (`Error adding a product. Check your connection. Detail: ${error}`)
        }
    }

    addCart = async (new_cart) => {
        try
        {
            let created_cart = cartModel.create(new_cart)
            return created_cart
        }
        catch (error)
        {
            return (`Error adding a new cart. Check your connection or code. Detail: ${error}`)
        }
    }

    deleteAllProductsFromCart = async (cartId) => {
        try {
            await cartModel.findByIdAndUpdate({_id: cartId},{products: []})
            return `Products successfully eliminated from cart (ID: ${cartId})`
        }
        catch (error) {
            return (`Error deleting a products. Detail: ${error}`)
        }
    }


    deleteProductFromCart = async (cartId, productId) => {
        try
        {
            let cart = await cartModel.findOne({_id: cartId})
            let product = await productModel.findOne({_id: productId})
            let productInCart = cart.products.find(p => p.product._id == productId)??null
            if(productInCart) {
                cart.products.splice(cart.products.indexOf(productInCart), 1)
                await cartModel.findByIdAndUpdate({_id: cartId},cart)
                return `Product "${product.title}" was successfully deleted from the cart with ID ${cart._id}`
            }
                return `Product "${product.title}" is not in this cart.`
        }
        catch (error)
        {
            throw Error (`Error deleting a product. Detail: ${error}`)
        }
    }

    #totalPriceOfCart = (cart) => {
        let total = 0
        cart.products.forEach(p => {
            total = total + (p.product.price*p.quantity)
        });
        return total
    }

    #checkStock = (cart) => {
        let stock = true
        let no_stock = []
        cart.products.forEach(p => {
            let qInCart = p.quantity
            let qInStock = p.product.stock
            if(qInCart <= qInStock) {
                stock = true
            } else {
                stock = false
                no_stock.push(p.product.id)
            }
        })
        no_stock.length > 0 ? stock=false : stock=true
        let data = {stock: stock, no_stock: no_stock}
        return data
    }

    #createTicket = async (cart, user) => {
        let totalAmount = this.#totalPriceOfCart(cart)
        let new_ticket = {
            code: Math.floor(Math.random()*2000000+1).toString(),
            purchase_datetime: Date.now(),
            amount: totalAmount,
            purchaser: user.email
        }
        let userTicket = await ticketModel.create(new_ticket)
        return userTicket
    }

    // #createStockCart= async (cartID, available) => {
    //     let nonStockProducts = []

    //     //Defino un nuevo carrito para la compra
    //     let StockCart = await cartModel.findOne({_id: cartID})
                        
    //     //Busco los productos enteros con los IDs que me traigo de checkStock
    //     available.no_stock.forEach(x => {
    //         let a = StockCart.products.find(p => p.product.id == x)
    //         nonStockProducts.push(a)
    //     })

    //     //Quito los productos que no hay stock del carrito
    //     nonStockProducts.forEach((p) => {
    //         StockCart.products.splice(StockCart.products.indexOf(p), 1) //--> Está sacando el producto incorrecto
    //     })

    //     return StockCart
    // }

    // #createNonStockCart= async (cartID) => {
        
    // }

    purchaseCart = async (cartID) => {
        try
        {
            let cart = await cartModel.findOne({_id: cartID})
            let user = await userModel.findOne({ cart_id: cartID})
            let available = this.#checkStock(cart)

            if(available.stock) {

                let newTicket = this.#createTicket(cart, user)
                this.deleteAllProductsFromCart(cartID)
                
                cart.products.forEach(p => {
                    PS.updateProduct(p.product._id, { stock: p.product.stock - p.quantity})
                })

                return newTicket

            } else {

                let nonStockProducts = []

                //Defino un nuevo carrito para la compra
                let StockCart = await cartModel.findOne({_id: cartID})
                
                //Busco los productos enteros con los IDs que me traigo de checkStock
                available.no_stock.forEach(x => {
                    let a = StockCart.products.find(p => p.product.id == x)
                    nonStockProducts.push(a)
                })
                
                //Quito los productos que no hay stock del carrito
                nonStockProducts.forEach((p) => {
                    StockCart.products.splice(StockCart.products.indexOf(p), 1)
                })
                
                // let StockCart = this.#createStockCart(cartID, available)
                //Genero el ticket
                let newTicket = this.#createTicket(StockCart, user)
                
                //Defino un nuevo carrito para actualizar la BD luego de la compra
                let nonStockCart = await cartModel.findOne({_id: cartID})

                //Busco los productos CON stock de StockCart, y los uso para quitarlos del nuevo carrito
                StockCart.products.forEach(x => {
                    let a = nonStockCart.products.find(p => p.product.id == x.product.id)
                    nonStockCart.products.splice(nonStockCart.products.indexOf(a), 1)
                })

                //Actualizo el carrito de la BD con los productos que no pude comprar (almacenados en nonStockCart)
                await cartModel.findByIdAndUpdate({_id: cartID}, nonStockCart)

                
                //Actualizo el stock de cada producto en la BD
                StockCart.products.forEach(p => {
                    PS.updateProduct(p.product._id, { stock: p.product.stock - p.quantity})
                })

                return newTicket
            }
        }
        catch (error)
        {
            return `An error occurred while processing purchase. Error: ${error}`
        }
    }
}

