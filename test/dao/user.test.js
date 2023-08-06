import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import UserSerivce from "../../src/Services/Users.Service.js";
import config from "../../src/config/config.js";

const expect = chai.expect
mongoose.connect(config.mongoUrl);

const requester = supertest(`http://localhost:${config.port}`)

let cookie = ''

describe('Testing user process', () => {
    
    //Testing para el registro
    it('User has to be correctly registered', async function () {
        let newUser = {
            first_name: "Test user name 1",
            last_name: "Test user surname 1",
            email: "testemail1@gmail.com",
            age: 25,
            password: "123456"
        }

        const { statusCode, ok, _body} = await requester.post('/api/sessions/register').send(newUser)

        expect(statusCode).is.equal(201);
        expect(_body).to.have.property('status', 'success');
        expect(_body).ok;
    })

    //Testing para el loggin
    it('Testing for the loggin process', async function () {
        let logUser = {
            email: "adminCoder@coder.com",
            password: "adminCod3r123"
        }

        const { statusCode, headers, ok, _body} = await requester.post('/api/sessions/login').send(logUser)

        cookie = headers['set-cookie'][0]
        expect(_body).ok
        expect(statusCode).is.equal(201)
        expect(_body).to.have.property('status', 'success')
    })

    //Testing para el logout
    it('Finally testing the logout process', async function () {

        const { _body, ok, statusCode } = await requester.get('/logout').set('Cookie', cookie)
        
        expect(_body).ok
        expect(statusCode).is.equal(201)
        expect(_body).to.have.property('status', 'success')
      })
})

