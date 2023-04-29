import {Router} from 'express';
const routerU = Router();

routerU.get('/login', (req, res)=>{
    res.render("login");
})

routerU.get('/register', (req, res)=>{
    res.render("register");
})

routerU.get('/', (req, res)=>{
    res.render("profile", {
        user: req.session.user
    });
})

export default routerU;