import CartService from "../Services/Cart.Service.js"
import UserSerivce from "../Services/Users.Service.js"

let US = new UserSerivce()
let CS = new CartService()

export const addCart = async (req, res) => {
    let result = await CS.addCart()
    res.send(result)
}

export const getCartById = async (req, res) => {
    let result = await CS.getCartById(req.params.cid)
    res.status(201).send(result)
}

export const deleteProductFromCart = async (req, res) => {
    let result = await CS.deleteProductFromCart(req.params.cid, req.params.pid)
    res.send(result)
}

export const subtractProductUnit = async (req, res) => {
    let result = await CS.subtractProductUnit(req.params.cid, req.params.pid)
    res.send(result)
}

export const deleteAllProductsFromCart = async (req, res) => {
    let result = await CS.deleteAllProductsFromCart(req.params.cid)
    res.send(result)
}

export const addProductToCart = async (req, res) => {
    let result = await CS.addProductToCart(req.params.cid, req.params.pid)
    res.status(202).send(result)

}

export const purchaseCart = async (req, res) => {
    let result = await CS.purchaseCart(req.params.cid)
    res.status(202).send(result)
}