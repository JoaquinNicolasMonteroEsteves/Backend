import nodemailer from 'nodemailer'
import config from '../config/config.js'
import { __dirname } from '../utils.js'

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
                to: ticket.purchaser,
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
            let Text = `and sended to ${ticket.purchaser}`
            let mailing = {mailingFailed: Failed, mailingText: Text}
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    Text = `The purchase was successfull but couldn't be sent an email to: ${ticket.purchaser}`
                    Failed = true
                }
            })
            return mailing
        } catch (error) {
            return `An error occurred while trying to sending the email. Detail: ${error}`
        }
    }

    sendDeletedEmail = async (users) => {
      try {
        let mailing = []
        users.forEach((u,i) => {
          const mailOptions = {
              from: "Coder test " + config.gmailAccount,
              to: u.email,
              subject: "Account deleted",
              html: `<div>
                      <h2>Your has been deleted</h2>
                      <p>
                        Dear user (or ex), we are sorry to inform you that your account has been deleted due to inactivity (2 days or more, 
                        we have not so much patience).\n
                        Hope to see you soon again!
                      </p>
                    </div>`,
              attachments: []
          }
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
             return `An error ocurred while trying to send an email. ${i} out of a total of ${users.length} were sent. \n
             Users: ${users} \n
             Detail: ${error}`
            }
          })
          mailing.push(u.email)
        })
        return mailing
      } catch (error) {
          return `An error occurred while trying to sending the email. Detail: ${error}`
      }
    }
    
    // sendEmailWithAttachments = async (ticketID) => {
    //     try {
    //         let ticket = await ticketModel.findOne({_id: ticketID})
    //         const mailOptionsWithAttachments = {
    //             //Cuerpo del mail
    //             from: "Coder test " + config.gmailAccount,
    //             to: config.gmailAccount,
    //             subject: "Testing mailing from Backend Application with attachments",
    //             html: `<div>
    //                     <h1>This is a test of mailing using Nodemailer library with attachments</h1>
    //                     <p>This is the attachment:</p>
    //                     <img src="cid:meme" />
    //                    </div>`,
    //             attachments: [
    //                 {
    //                     filename: 'Bird meme',
    //                     path: __dirname + '/public/images/birdMeme.jpeg',
    //                     cid: "meme"
    //                 }
    //             ]
    //         }

    //         transporter.sendEmail(mailOptionsWithAttachments, (error, info) => {
    //             if (error) {
    //                 res.status(400).send({ msg: "Error in attached mailing service", payload: error })
    //             }
    //             console.log('Message sent: ', info.messageId);
    //             res.send({ msg:"Success", payload: info })
    //         })
    //     } catch (error) {
    //         return `An error occurred while trying to sending the email. Detail: ${error}`
    //     }
    // }

    sendRestoreLink = async (email, link) => {
        try {
          const mailOptions = {
            from: 'Coder TEST' + config.gmailAccount,
            to: email,
            subject: 'Restablecimiento de contraseña - PROYECTO BACKEND NP!',
            html:
              `<div>
                <h1> Pedido de restablecimiento de contraseña para ${email} </h1>
                <p> El siguiente link lo llevará a un sitio donde deberá introducir la nueva contraseña de su cuenta: </p>
                <a href='${link}'> Restablecer contraseña </a>
                <p> Si usted no solicitó esta acción, ignore este mensaje.</p>
              </div>`,
          }

        let Failed = false
        let Text = `and sended to ${config.gmailAccount}`
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                Text = `The purchase was successfull but couldn't be sent an email to: ${config.gmailAccount}`
                Failed = true
            }
        })
        } catch (error) {
          return { message: 'Email could not be sent to: ' + data.email, detail: error }
        }
      }    
}