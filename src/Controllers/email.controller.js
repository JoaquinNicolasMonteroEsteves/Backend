// import nodemailer from 'nodemailer'
// import config from '../config/config.js'
// import { __dirname } from '../utils.js'
import EmailService from '../Services/Email.Service.js'
import config from '../config/config.js'
import { generateJWToken } from '../utils.js'

const ES = new EmailService()

export const sendEmail = async (req, res) => {
    let result = await ES.sendEmail(req.params.tid)
    res.send(result)
}

export const sendEmailWithAttachments = async (req, res) => {
    let result = await ES.sendEmail(req.params.tid)
    res.send(result)
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