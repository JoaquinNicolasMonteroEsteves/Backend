import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect

let token= ''
let cookie = ''
let admin
let requester = supertest('http://localhost:8080')

describe('Testing products process', () => {

  before(async function() {
    admin = { email: 'adminCoder@coder.com', password: 'adminCod3r123'}
    const { _body, headers } = await requester.post('/api/sessions/login').send(admin)
    token = _body.access_token

    cookie = headers['set-cookie'][0]
  })

  //Testing para la obtención de todos los productos
  it('Products has to be correctly displayed', async function () {
    const {_body, headers, ok, statusCode} = await requester.get('/products').send({testing: true}).set('Cookie', cookie)
    
    expect(_body).ok
    expect(_body.user).to.have.property('role', 'admin')
    expect(statusCode).is.equal(201)
  })

  //Testing para la creación de un producto
  it('Products has to be correctly created', async function () {
    let mockProduct = {
      title: 'Test Product',
      category: 'terror',
      description: 'Testing product router',
      price: 100,
      thumbnail: 'url-test',
      code: 1234,
      stock: 100
    }
    const { _body, ok, statusCode } = await requester.post('/api/products').send(mockProduct).set('Cookie', cookie)
    expect(_body).ok
    expect(statusCode).is.equal(201)
    expect(_body.payload).to.have.property('status', true)
  })
})