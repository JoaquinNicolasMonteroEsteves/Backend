// import nodemailer from 'nodemailer'
// import config from '../config/config.js'
// import { __dirname } from '../utils.js'
import EmailService from '../Services/Email.Service.js'

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
        await ES.sendRestoreLink(req.params.umail)
        res.status(201).send({status: 'Email successfully sended'})
    }
    catch ( error ) {
        res.status(405).send({status: 'Failed email controller function', error: error})
    }
}