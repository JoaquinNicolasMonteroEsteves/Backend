export const createProductError = (product) => {
    return `One or more properties are incomplete or invalid.
    List of required properties:
      * title: type String, received: ${product.title}
      * category: type String, received: ${product.category}
      * description: type String, received: ${product.description}
      * thumbnail: type Strinf, received: ${product.thumbnail}
      * price: type Number, received: ${product.price}
      * code: type Number, received: ${product.code}
      * stock: type Number, received: ${product.stock}
      * status: type Boolean, received: ${product.status}
    `
  }