import { Router } from "express";
import { generateJWToken, is_valid_password } from "../utils.js";
import passport from "passport";
import UserSerivce from "../Services/Users.Service.js";
import userDTO from "../Services/DTO/users.dto.js";
import EErrors from '../Services/Errors/error-enum.js'
import CustomError from '../Services/Errors/customError.js'

const routerS = Router()
let US = new UserSerivce()

// LOGIN using jwt:
routerS.post('/login', async (req, res)=>{
  const {email, password} = req.body
  try {
    const user = await US.getUser({ email: email })
    if (!user) {
      // console.warn('User does not exist with username: ' + email)
      // return res.status(401).send({ status: 'Not found', message: 'User does not exist with username: ' + email })
      CustomError.createError({
        name: 'User login error',
        cause: 'User does not exist',
        message: `User does not exist with username + ${email}. Please verify your email or register first if you don't have an account on this site.`,
        code: EErrors.NOT_FOUND
      })
    }
    if (!is_valid_password(user, password)) {
      // console.warn('Invalid credentials for user: ' + email)
      // return res.status(401).send({ status: 'error', message: 'User and password do not match!' })
      CustomError.createError({
        name: 'User login error',
        cause: 'Invalid credentials',
        message: `Username ${email} and password do not match! Please, try again.`,
        code: EErrors.INVALID_CREDENTIALS
      })
    }
    const tokenUser = new userDTO(user)
    const access_token = generateJWToken(tokenUser)
    res.cookie('jwtCookieToken', access_token, { maxAge: 600000, httpOnly: true }) // 10 min
    res.send({message: 'Login successful!', jwt: access_token })
  } catch (error) {
    console.error(error)
    // return res.status(500).send({ status:'error', error:'Internal application error'})
    res.status(400).json({ status: 'Error', message: error.message })
  }
})


// REGISTER:
routerS.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }), async (req, res) => {
    console.log('New user successfylly created')
    res.status(201).send({status: "success", msg: 'User created successfully created'})
})

routerS.get('/fail-register', (req, res) => {
  res.status(401).send({ error: "Failed to process register!" })
})

routerS.get('/fail-login', (req, res) => {
  res.status(401).send({ error: "Failed to process login!" })
})

// Usando GitHub
routerS.get('/github', passport.authenticate('github',{scope:['user:email']}), async (req,res) => {})

routerS.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/github/error'}), async (req, res) => {
    let user = req.user
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    req.session.admin = true
    res.redirect('/github')
})

export default routerS;