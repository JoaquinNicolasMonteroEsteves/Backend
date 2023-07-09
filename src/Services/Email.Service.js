import nodemailer from 'nodemailer'
import config from '../config/config.js'
import { __dirname } from '../utils.js'
import ticketModel from './models/ticket.model.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
      user: config.gmailAccount,
      pass: config.gmailAppPassword
    }
  })

transporter.verify(function (error, success) {
    if (error) {
        console.log(`Error while loading email controller. Detail: ${error}`);
    }
})

export default class EmailService {

    sendEmail = async (ticket) => {
        try {
            const mailOptions = {
                from: "Coder test " + config.gmailAccount,
                to: config.gmailAccount,
                subject: "Products pruchased!",
                html: `<div>
                        <h1>Your products where successfully pruchased and here is your ticket detail:</h1>
                        <ul>
                            <li>Ticket code: #${ticket.code}</li>
                            <li>Total payment: ${ticket.amount}</li>
                        </ul>
                       </div>`,
                attachments: []
            }

            let Failed = false
            let Text = `and sended to ${config.gmailAccount}`
            let mailing = {mailingFailed: Failed, mailingText: Text}
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    Text = `The purchase was successfull but couldn't be sent an email to: ${config.gmailAccount}`
                    Failed = true
                }
            })
            return mailing
        } catch (error) {
            return `An error occurred while trying to sending the email. Detail: ${error}`
        }
    }
    
    sendEmailWithAttachments = async (ticketID) => {
        try {
            let ticket = await ticketModel.findOne({_id: ticketID})
            const mailOptionsWithAttachments = {
                //Cuerpo del mail
                from: "Coder test " + config.gmailAccount,
                to: config.gmailAccount,
                subject: "Testing mailing from Backend Application with attachments",
                html: `<div>
                        <h1>This is a test of mailing using Nodemailer library with attachments</h1>
                        <p>This is the attachment:</p>
                        <img src="cid:meme" />
                       </div>`,
                attachments: [
                    {
                        filename: 'Bird meme',
                        path: __dirname + '/public/images/birdMeme.jpeg',
                        cid: "meme"
                    }
                ]
            }

            transporter.sendEmail(mailOptionsWithAttachments, (error, info) => {
                if (error) {
                    res.status(400).send({ msg: "Error in attached mailing service", payload: error })
                }
                console.log('Message sent: ', info.messageId);
                res.send({ msg:"Success", payload: info })
            })
        } catch (error) {
            return `An error occurred while trying to sending the email. Detail: ${error}`
        }
    }
}