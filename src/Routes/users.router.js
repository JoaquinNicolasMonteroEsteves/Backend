import {Router} from 'express';
import { authorization, passportCall, uploader } from '../utils.js';
import { authJWToken } from '../utils.js';
import { restorePass, upgradeUser, uploadDocs } from '../Controllers/users.controller.js';
import { sendRestoreLink } from '../Controllers/email.controller.js';
import UserSerivce from '../Services/Users.Service.js';
const routerU = Router();

let US = new UserSerivce()

routerU.get('/', passportCall('login'), authorization(['admin','premium','user']), async (req, res) => {
    let user = await US.getUser({email: req.user.email})
    req.user.role = user.role
    res.render('profile', { user: req.user})
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

routerU.put('/restore/new', restorePass)

routerU.post('/:umail/documents', uploader.any(), uploadDocs) 

export default routerU;