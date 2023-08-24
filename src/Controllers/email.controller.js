import EmailService from '../Services/Email.Service.js'
import UserSerivce from '../Services/Users.Service.js'
import config from '../config/config.js'
import { generateJWToken } from '../utils.js'

const ES = new EmailService()
const US = new UserSerivce()

export const sendEmail = async (req, res) => {
    let result = await ES.sendEmail(req.params.tid)
    res.send(result)
}

export const sendEmailWithAttachments = async (req, res) => {
    let result = await ES.sendEmail(req.params.tid)
    res.send(result)
}

export const sendDeletedEmail = async (req, res) => {
    try {
        let idleUsers = await US.getIdleUsers()
        let result = await ES.sendDeletedEmail(idleUsers) 
        if(typeof(result) == "object") {
            res.status(201).send("Account deleted and email sent to the next users: \n" + result)
        } else {
            res.status(404).send(result)
        }
    } catch (error) {
        res.send({ status: 'Error', message: `Account from the users were successfully deleted, but couldn't sent emails! Detail: ${error}`})
    }
}

export const sendProductDeletedEmail = async (req, res) => {
    try {
        let result = await ES.sendProductDeletedEmail(req.params.umail, req.params.pname) 
        if(typeof(result) == "object") {
            res.status(201).send("Product deleted and email sent to " + result.user)
        } else {
            res.status(404).send(result)
        }
    } catch (error) {
        res.send({ status: 'Error', message: `Account from the users were successfully deleted, but couldn't sent emails! Detail: ${error}`})
    }
}

export const sendRestoreLink = async (req, res) => {
    try {
        let link = `http://localhost:${config.port}/restore/password?token=${encodeURIComponent(generateJWToken(req.params.umail))}`
        await ES.sendRestoreLink(req.params.umail, link)
        res.status(201).send({status: 'Email successfully sent'})
    }
    catch ( error ) {
        res.status(405).send({status: 'Failed email controller function', error: error})
    }
}