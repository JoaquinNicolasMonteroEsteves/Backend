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