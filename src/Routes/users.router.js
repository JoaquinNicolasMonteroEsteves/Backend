import {Router} from 'express';
import { authorization, passportCall } from '../utils.js';
import { authJWToken } from '../utils.js';
const routerU = Router();

routerU.get('/', passportCall('login'), authorization(['admin','user']), (req, res) => {
    res.render('profile', { user: req.user})
})

routerU.get('/login', (req, res)=>{
    res.render("login");
})

routerU.get('/register', (req, res)=>{
    res.render("register");
})

routerU.get('/', authJWToken, (req, res)=>{
    res.render("profile", {
        user: req.user
    });
})

routerU.get('/error', (req, res) => {
    res.render("error")
})

export default routerU;