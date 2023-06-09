import {Router} from 'express';
import { authorization, passportCall } from '../utils.js';
import { authJWToken } from '../utils.js';
import { restorePass, upgradeUser } from '../Controllers/users.controller.js';
import { sendRestoreLink } from '../Controllers/email.controller.js';
const routerU = Router();

routerU.get('/', passportCall('login'), authorization(['admin','premium','user']), (req, res) => {
    res.render('profile', { user: req.user})
})

routerU.get('/', authJWToken, (req, res)=>{
    res.render("profile", {
        user: req.user
    });
})

routerU.get('/login', (req, res)=>{
    res.render("login");
})

routerU.get('/register', (req, res)=>{
    res.render("register");
})

routerU.get('/error', (req, res) => {
    res.render("error")
})

routerU.post('/premium/:umail', upgradeUser)

routerU.post('/restore/:umail', sendRestoreLink)

routerU.post('/restore/new/', restorePass)

export default routerU;