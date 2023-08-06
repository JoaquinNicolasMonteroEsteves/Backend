import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect

let cookie =''
let userCartId = ''
let productId = ''
let requester = supertest('http://localhost:8080')

describe('Testing carts process', () => {
  
  before(
    async function() {
    this.user = { email: 'joaquinnme@outlook.com', password: 'contradeprueba2'}
    const { _body, headers, ok, statusCode } = await requester.post('/api/sessions/login').send(this.user)
    cookie = headers['set-cookie'][0]
  })

  it("User's cart has to be correctly dsiplayed", async function () {
    userCartId = '648796c0a7485065fac2840e'
    const { _body, ok, statusCode } = await requester.get(`/carts/${userCartId}`).set('Cookie', cookie)
    expect(_body).ok
    expect(_body.payload.cart).to.have.property('products')
    expect(statusCode).is.equal(200)
  })

  it("Product has to be correctly added to the users's cart", async function () {
    productId = '6443147cb4a7b6cb7c9f071c'
    const { _body, ok, statusCode } = await requester.post(`/api/carts/${userCartId}/products/${productId}`).send(userCartId, productId).set('Cookie', cookie)
    expect(_body).ok
    expect(_body).to.have.property('status', 'Success')
    expect(statusCode).is.equal(201)
  })

  it("Product has to be correctly deleted to the users's cart", async function () {
    const { _body, ok, statusCode } = await requester.delete(`/api/carts/${userCartId}/products/${productId}`).send(userCartId, productId).set('Cookie', cookie)
    expect(_body).ok
    expect(_body).to.have.property('status', 'Success')
    expect(statusCode).is.equal(201)
  })
})