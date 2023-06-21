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

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 587,
//     auth: {
//         user: config.gmailAccount,
//         pass: config.gmailAppPassword
//     }
// })

// transporter.verify(function (error, success) {
//     if (error) {
//         console.log(`Error while loading email controller. Detail: ${error}`);
//     }
// })

// const mailOptions = {
//     //Cuerpo del mail
//     from: "Coder test " + config.gmailAccount,
//     to: config.gmailAccount,
//     subject: "Testing mailing from Backend Application",
//     html: `<div><h1>This is a test of mailing using Nodemailer library</h1></div>`,
//     attachments: []
// }

// const mailOptionsWithAttachments = {
//     //Cuerpo del mail
//     from: "Coder test " + config.gmailAccount,
//     to: config.gmailAccount,
//     subject: "Testing mailing from Backend Application with attachments",
//     html: `<div>
//             <h1>This is a test of mailing using Nodemailer library with attachments</h1>
//             <p>This is the attachment:</p>
//             <img src="cid:meme" />
//            </div>`,
//     attachments: [
//         {
//             filename: 'Bird meme',
//             path: __dirname + '/public/images/birdMeme.jpeg',
//             cid: "meme"
//         }
//     ]
// }

// export const sendEmail = (req, res) => {
//     try {
//         let result = transporter.sendEmail(mailOptions, (error, info) => {
//             console.log("dentro del try de sendEmail");
//             if (error) {
//                 res.status(400).send({ msg: "Error in mailing service", payload: error })
//             }
//             console.log('Message sent: ', info.messageId);
//             res.send({ msg:"Success", payload: info })
//         })
//     } catch (error) {
//         return `An error occurred while trying to sending the email. Detail: ${error}`
//     }
// }

// export const sendEmailWithAttachments = (req, res) => {
//     try {
//         let result = transporter.sendEmail(mailOptionsWithAttachments, (error, info) => {
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