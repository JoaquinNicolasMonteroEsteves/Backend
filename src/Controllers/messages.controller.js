import MessageService from "../Services/Messages.Service.js"

let MS = new MessageService()

export const sendMessage = async (req, res) => {
    let result = await MS.sendMessage(req.params.uemail, req.params.msg)
    res.send(result)
}