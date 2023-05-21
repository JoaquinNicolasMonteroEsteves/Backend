import { Router } from "express";
import userModel from "../Services/models/user.model.js";
import { generateJWToken, is_valid_password } from "../utils.js";
import passport from "passport";
import UserSerivce from "../Services/Users.Service.js";

const routerS = Router()
let US = new UserSerivce()

// LOGIN using jwt:
routerS.post('/login', async (req, res)=>{
  const {email, password} = req.body
  try {
    const user = await US.getUser({ email: email })
    // const user = await userModel.findOne({ email: email })
    if (!user) {
      console.warn('User does not exist with username: ' + email)
      return res.status(204).send({ error: 'Not found', message: 'User does not exist with username: ' + email })
    }
    if (!is_valid_password(user, password)) {
      console.warn('Invalid credentials for user: ' + email)
      return res.status(401).send({ status: 'error', error: 'User and password do not match!' })
    }
    const tokenUser = {
      name : `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role
    }
    const access_token = generateJWToken(tokenUser)
    res.cookie('jwtCookieToken', access_token, { maxAge: 60000, httpOnly: true }) // 1 min
    res.send({message: 'Login successful!', jwt: access_token })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ status:'error', error:'Internal application error'})
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