import {Router} from 'express';
import { authorization, passportCall, uploader } from '../utils.js';
import { getAndDeleteIdleUsers, getUsers, restorePass, upgradeUser, uploadDocs } from '../Controllers/users.controller.js';
import { sendDeletedEmail, sendRestoreLink } from '../Controllers/email.controller.js';
import UserSerivce from '../Services/Users.Service.js';
const routerU = Router();

let US = new UserSerivce()

routerU.get('/profile', passportCall('login'), authorization(['admin','premium','user']), async (req, res) => {
    let user = await US.getUser({email: req.user.email})
    req.user.role = user.role
    res.render('profile', { user: req.user})
})

routerU.delete('/', getAndDeleteIdleUsers, sendDeletedEmail)

routerU.get('/login', (req, res)=>{
    res.render("login");
})

routerU.get('/register', (req, res)=>{
    res.render("register");
})

routerU.get('/error', (req, res) => {
    res.render("error")
})

routerU.get('/', getUsers)

routerU.post('/premium/:umail', upgradeUser)

routerU.post('/restore/:umail', sendRestoreLink)

routerU.post('/:umail/documents', uploader.any(), uploadDocs) 

routerU.put('/restore/new', restorePass)

export default routerU;