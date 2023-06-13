import messageModel from "./models/message.model.js";
import UserSerivce from "./Users.Service.js";

const US = new UserSerivce()

export default class MessageService {
    sendMessage = async (email, msg) => {
        try {
            let new_msg = {user: email, message: msg}
            await messageModel.create(new_msg)

            let user = US.getUser({email: email})
            return user

        } catch (error) {
            return `An error occurred while creating and sending the message. Detail: ${error}`
        }
    }
}