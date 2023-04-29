import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import { create_hash, is_valid_password } from "../utils.js";

const routerS = Router()

routerS.post("/register", async (req, res) => {
    try {
        const {first_name, last_name, email, age, password} = req.body
        console.log(("Registrando a:"));
        console.log(req.body);
    
        let exists = await userModel.findOne({email})
        if (exists) {
            return res.status(400).send({status: "error", msg: "Already existing user"})
        }
        let user = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            age: age,
            password: create_hash(password)
        }
        let result = await userModel.create(user)
        res.status(201).send({status: "success", msg: `User created successfully. ID: ${user.id}`, user: result})
    }
    catch (error) {
        return new Error (`An error occured while creating a new user. Check for ${error}`)
    }
})

routerS.post("/login", async (req, res) => {
    let { email, password } = req.body
    if (req.body.email === "adminCoder@coder.com" && req.body.password === "adminCod3r123")
    {
        req.session.user = {
            name: `CoderHouse`,
            email: req.body.email,
            age: 9,
            role: "admin"
        }    
    } else {
        let user = await userModel.findOne({email})
        
        if(!user) return res.status(401).send({status: "error", msg: "Incorrect credentials"})
        if(!is_valid_password(user,password)) {return res.status(401).send({status:"error", msg: "Incorrect credentials"})}
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: "user"
        }
    }
    
    res.send({status: "success", payload: req.session.user, msg:"First login completed!"})
})



export default routerS;