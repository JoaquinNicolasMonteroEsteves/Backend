import { Router } from "express";

const routerG = Router()

routerG.get('/login', (req, res) => {
    res.render('github-login')
})

routerG.get('/', (req, res) => {
    res.redirect('/users')
})

routerG.get('/error', (req, res) => {
    res.render('error', {error: "Couldn't authenticate using GitHub"})
})

export default routerG