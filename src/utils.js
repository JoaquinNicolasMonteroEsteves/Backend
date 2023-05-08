import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const readLinkFilter = (filter) => {
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

// //Implementando JWT
// let private_key = "JoaquinNicolasMonteroEstevesKeyJWT"
// export const generateJWToken = (user) => {
//     return jwt.sign({user}, private_key, {expiresIn: '24h'})
// }


// export const authJWToken = (req, res, next) => {
//     //Guardado en los headers de autorización
//     let authHeader = req.headers.authotization
//     if(!authHeader) {
//         return res.status(401).send({error: 'User not authenticated or missing token.'})
//     }
//     let token = authHeader.split(' ')[1]
//     //Validar token
//     jwt.verify(token, private_key, (error, credentials) => {
//         if (error) return res.status(403).send({error:"Invalid token, unauthorized."})
//         req.user = credentials.user
//         next()
//     })
// }

// Generación del Hash
export const create_hash = password =>  bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// Validad la contraseña
export const is_valid_password = (user, password) => { // -> esta función se la llama en el login, en sessions.router.js
    return bcrypt.compareSync(password, user.password)
} 

export {
    __dirname,
    readLinkFilter
}

