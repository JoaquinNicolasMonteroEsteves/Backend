import { Router } from "express";
import { sendEmail, sendEmailWithAttachments } from '../Controllers/email.controller.js'

const routerE = Router()

routerE.get('/', sendEmail)
routerE.get('/attachments', sendEmailWithAttachments)

export default routerE