import cartModel from "../models/cartModel.js"
import productModel from "../models/product.model.js"

class CartManagerDB {

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

    updateProductQuantity = async (cartId, productId, newQuantity) => {
        try {
            let cart = await cartModel.findOne({_id: cartId})
            let product = await productModel.findOne({_id: productId})
            let productInCart = cart.products.find(p => p.product._id == productId)??null
            if(!productInCart) {    
                return `There is no product named "${product.title}" in the cart (ID: ${cart.id})`
            }
            else {
                productInCart.quantity = newQuantity
                await cartModel.findByIdAndUpdate({_id: cartId},cart)
                return `The amount of "${product.title}" was successfully updated at cart ${cart.id}. Actual count: ${productInCart.quantity}`
            }
        }
        catch (error) {

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
                return `Product "${product.title}" was successfully deleted from the cart with code ${cart.code}`
            }
                return `Product "${product.title}" is not in this cart.`
        }
        catch (error)
        {
            throw Error (`Error deleting a product. Detail: ${error}`)
        }
    }
}

export default CartManagerDB