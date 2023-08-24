import { Router } from "express";
import { sendProductDeletedEmail } from "../Controllers/email.controller.js";

const routerE = Router();

routerE.post('/:umail/:pname', sendProductDeletedEmail)

export default routerE