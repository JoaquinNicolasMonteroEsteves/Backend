import UserSerivce from "../Services/Users.Service.js"
import jwt from 'jsonwebtoken'
import CustomError from "../Services/Errors/customError.js"
import { create_hash, is_valid_password, private_key } from "../utils.js"
import { createPasswordError, expiredLinkError } from "../Services/Errors/Messages/password-error.message.js"
import EErrors from "../Services/Errors/error-enum.js"

const US = new UserSerivce()

export const upgradeUser = async (req, res) => {
  try {
    let email = req.params.umail
    let update = await US.upgradeUser(email)
    res.status(201).send(update)
  } catch (error) {
    res.send({ status: 'Error', message: `User could not be upgrated! Detail: %${error}`})
  }
}

export const restorePass = async (req, res) => {
  try {
    if ( !req.query.token ) {
      CustomError.createError({
        name: 'Expired link error',
        cause: expiredLinkError(),
        message: 'The link you are using is already expired. Please, try again and generate a new link',
        code: EErrors.INVALID_CREDENTIALS
      })
    }
    try {
      //Si el link no expiró
      let decoded = jwt.verify(req.query.token, private_key)
      let emailToken = decoded.user

      if (req.body.pass != req.body.repeatPass) {
        CustomError.createError({
          name: 'Password change error',
          cause: createPasswordError(),
          message: 'Password fields must match! Please, try again',
          code: EErrors.INVALID_CREDENTIALS
        })
      }

      // Comparo la contraseña nueva "pass" contra la que ya tiene (se manda el usuario entero)
      let user = await US.getUser({email: emailToken})
      if(is_valid_password(user, req.body.pass)){
        CustomError.createError({
            name: 'Password change error',
            cause: createPasswordError(),
            message: 'Password must must be different from the current one! Please, try another one!',
            code: EErrors.INVALID_CREDENTIALS
          })
        }
      await US.restorePass(emailToken, create_hash(req.body.pass))
      
      res.status(201).json({status: "Success", message:'Password was successfully restored!'})
    }
    catch(error) {
      res.status(400).json({status: 'Error', message: error.message, detail: error.cause})
    }

    // if(result.status == 503) {
    //   res.status(503).json()
    // }
    
    // res.status(201).json(result)
  
  }
  catch (error) {
    res.status(500).json({ status: 'Error', message: `Password couldn't be changed! Detail: %${error}`})
  }
}