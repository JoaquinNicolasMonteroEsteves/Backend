import productModel from "./models/product.model.js";

export default class ProductService {
    getProducts = async (query) => {
        try {
            let limit = query.limit ? parseInt(query.limit) : 10
            let page = query.page ? parseInt(query.page) : 1
            
            let order = {}
            if (query.sort == 'asc') { order.price = 1 }
            else if (query.sort == 'desc') { order.price = -1}
            
            
            let s_params = query.stock ? this.#defineStock(query.stock) : undefined
            let query_a = query.category ? query.category.toLowerCase() : undefined
            
            let conditions = {}
            query_a ? conditions.category = {$eq: query_a} : {}
            s_params ? conditions.$or = [{stock: {$lt: s_params.n_s}},{stock: {$gte: s_params.s}}] : {}
            
            let result = productModel.paginate(productModel.find(conditions).sort(order), {page: page, limit: limit, lean: true})
            return result
        }
        catch (error) { 
            return (`Error getting products from database. Detail: ${error}`)
        }
    }

    addProduct = async (pdt) => {
        try
        {
            let new_product = await productModel.create(pdt)
            return new_product
        }
        catch (error)
        {
            return (`Error adding a new product, check your connection. Detail: ${error}`)
        }
    }
    
    updateProduct = async (id, updatedInfo) => {
        try {
          await productModel.findOneAndUpdate({ _id: id }, updatedInfo)
          let updatedProduct = await productModel.findOne({ _id: id })??null
          return updatedProduct
        } catch (error) {
          retrun `An error has occurred by updating a product. Error detail: ${error}`
        }
      }

    #defineStock = (stock) => {
        let s
        let n_s
        if (stock == "true") {s=1; n_s=null}
        else if (stock == "false") {s=null; n_s=1}
        return {s, n_s}
    }

    deleteProduct = async (id) => {
        try {
            let deletedProduct = await productModel.findOneAndDelete({_id: id}, {title:1, owner:1, _id:0})
            await productModel.insertMany(deletedProduct)
            return deletedProduct
        } catch (error) {
            return `An error has occurred by deleting a product. Error detail: ${error}`
        }
    }
}

