import ProductService from "../Services/Product.Service.js"

let PS = new ProductService()

export const addProduct = async (req, res) => {
    try
    {
        let result = await PS.addProduct(req.body)
        if(!result.status) {
            res.status(405).send({status: 'Error', msg: "An error occurred while trying to add a new product"})
        }
        res.status(201).send(result)
        
    }
    catch (error){
        return error
    }
}
