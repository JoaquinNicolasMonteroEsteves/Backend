import ProductService from "../Services/Product.Service.js"
import CustomError from "../Services/Errors/customError.js"
import { createProductError } from '../Services/Errors/Messages/product-error.message.js'
import EErrors from "../Services/Errors/error-enum.js"

let PS = new ProductService()

export const deleteProduct = async (req, res) => {
  let productId = req.params.pid
  let deletedProduct = await PS.deleteProduct(productId)
  if (typeof(deletedProduct) == "object") {
    res.status(201).send(deletedProduct)
  } else {
    res.send({status: 'Error', message: `Product with ID: ${productId} couldn't be deleted`})
  }
}

export const addProduct = async (req, res) => {
    try {
        let product = req.body
        if (!product.title || !product.category || !product.description || !product.price  || !product.code || !product.stock || !product.status ) {
          CustomError.createError({
            name: 'Product creation error',
            cause: createProductError(product),
            message: 'Please complete all the fields! Check console for more information about the required properties.',
            code: EErrors.INVALID_TYPE_ERROR
          })
        }
        let result = await PS.addProduct(product)
        res.status(201).json({ status: 'Success', message: `Product successfully added to the list with id: ${result.id}`})
      } catch (error) {
        res.status(400).json({ status: 'Error', message: error.message, detail: error.cause })
      }
}
