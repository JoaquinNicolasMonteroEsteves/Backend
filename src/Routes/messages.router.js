import {Router} from 'express';
import { sendMessage } from '../Controllers/messages.controller.js';

const routerM = Router();

routerM.post('/:uemail/:msg', sendMessage)

export default routerM