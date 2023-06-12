import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


export const readLinkFilter = (filter) => {
    let le_ble = ''
    let bla_filter = filter
    bla_filter.page ? delete bla_filter.page : {}
    let bla_keys = Object.keys(bla_filter)
    let bla_values = Object.values(bla_filter)
    let bla_pairs = bla_keys.concat(bla_values)
    if (bla_pairs != []) {
        for (let i=0; i< (bla_pairs.length/2); i++){
            let string = `${bla_pairs[i]}=${bla_pairs[i+bla_pairs.length/2]}&`
            le_ble += string
        }
    }
    return le_ble
}

//Implementando JWT
export const private_key = "JoaquinNicolasMonteroEstevesKeyJWT"
export const generateJWToken = (user) => {
    return jwt.sign({user}, private_key, {expiresIn: '24h'})
}


export const authJWToken = (req, res, next) => {
    //Guardado en los headers de autorización
    let authHeader = req.headers.authotization
    if(!authHeader) {
        return res.status(401).send({error: 'User not authenticated or missing token.'})
    }
    let token = authHeader.split(' ')[1]
    //Validar token
    jwt.verify(token, private_key, (error, credentials) => {
        if (error) return res.status(403).send({error:"Invalid token, unauthorized."})
        req.user = credentials.user
        next()
    })
}

// Generación del Hash
export const create_hash = password =>  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// Validad la contraseña
export const is_valid_password = (user, password) => { // -> esta función se la llama en el login, en sessions.router.js
    return bcrypt.compareSync(password, user.password)
} 

// Cookie Extractor:
export const cookieExtractor = req => {
    let token = null
    if (req && req.cookies) {
      token = req.cookies['jwtCookieToken']
    }
    return token
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
      passport.authenticate(strategy, function (err, user, info) {
        if (err) return next(err)
        if (!user) {
          return res.status(401).send({error: info.messages?info.messages:info.toString()})
        }
        req.user = user
        next()
      }) (req, res, next)
    }
}

export const authorization = (roles) => {
    return async (req, res, next) => {
      if (!req.user) return res.status(401).send('Unauthorized: User not found in JWT')
      if (!roles.includes(req.user.role)  ) {
        return res.status(403).send('Forbidden: User has not permissions')
      }
      next()
    }
}