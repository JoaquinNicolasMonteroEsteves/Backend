import {Router} from 'express';
import { authorization, passportCall, uploader } from '../utils.js';
import { deleteUser, getAndDeleteIdleUsers, getUsers, restorePass, updateRole, upgradeUser, uploadDocs } from '../Controllers/users.controller.js';
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

routerU.delete('/:umail', passportCall('login'), authorization(['admin']), deleteUser)
// routerU.delete('/:umail', () => {console.log("Holaaaaaaaaaaa");})

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

routerU.post('/:umail/documents', uploader.any(), uploadDocs) 

routerU.put('/restore/new', restorePass)

routerU.put('/update', passportCall('login'), authorization(['admin']), updateRole)

export default routerU;