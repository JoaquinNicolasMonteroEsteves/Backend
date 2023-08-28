import UserSerivce from "../Services/Users.Service.js"
import jwt from 'jsonwebtoken'
import CustomError from "../Services/Errors/customError.js"
import { create_hash, is_valid_password, private_key } from "../utils.js"
import { createPasswordError, expiredLinkError } from "../Services/Errors/Messages/password-error.message.js"
import EErrors from "../Services/Errors/error-enum.js"

const US = new UserSerivce()

export const getUsers = async (req, res) => {
  try {
    let users = await US.getUsers()
    console.log("\n>>> Users found <<<\n")
    users.forEach((x,i) => {
      console.log(">> User " + (i+1))
      console.log(x)
    })
  } catch (error) {
    res.send({ status: 'Error', message: `Users couldn't be listed! Detail: ${error}`})
  }
}

export const getAndDeleteIdleUsers = async (req, res, next) => {
  try {
    let idleUsers = await US.getIdleUsers()
    if(idleUsers.length < 1) {
      res.status(201).send({status: "success", msg: "No user has been idle for two o more days!"})  
    } else {
      await US.deleteIdleUsers(idleUsers)
      next()
    }
  } catch (error) {
    res.send({ status: 'Error', message: `Idle users couldn't be obtained! Detail: ${error}`})
  }
}

export const upgradeUser = async (req, res) => {
  try {
    let email = req.params.umail
    let update = await US.upgradeUser(email)
    res.status(201).send(update)
  } catch (error) {
    res.send({ status: 'Error', message: `User could not be upgrated! Detail: ${error}`})
  }
}

export const updateRole = async (req, res) => {
  try {
    let result = await US.updateRole(req.body.email, req.body.role)
    if (typeof(result) == 'object') {
      res.status(201).json({ status: 'Success', message: `User role was successfully updated! Now ${result.email} is ${result.role}`})
    } else {
      res.status(400).json({ status: 'Error', message: result })
    }
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Documents could not be uploaded', detail: error})
  }
}

export const uploadDocs = async (req, res) => {
  try {
    let files = []
    req.files.forEach(f => {
        let docu = {
            name: f.originalname,
            reference: f.path
        }
        files.push(docu)
    })
    let upload = await US.uploadDocs(files, req.params.umail)
    if(upload) {
      res.status(201).send(upload)
    }
  } catch (error) {
    res.send({ status: 'Error', message: `Documents information couldn't be updated! Detail: ${error}`})
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
  }
  catch (error) {
    res.status(500).json({ status: 'Error', message: `Password couldn't be changed! Detail: %${error}`})
  }
}

export const deleteUser = async (req, res) => {
  try {
    let result = await US.deleteUser(req.params.umail)
    res.status(201).json({ status: 'Success', message: `User with email: ${result.email} was successfully deleted`})
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'User could not be deleted from de BD', detail: error})
  }
}

export const renderUsers = async (req, res) => {
  try {
    let users = await US.getUsers()
    let data = { users: users, admin: req.user }
    res.render('usersEdit', data)
  } catch (error) {
    res.render('error', error)
  }
}