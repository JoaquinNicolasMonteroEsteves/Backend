import UserSerivce from "../Services/Users.Service.js"

const US = new UserSerivce()

export const upgradeUser = async (req, res) => {
  try {
    let email = req.params.umail
    let update = await US.upgradeUser(email)
    res.status(201).send(update)
  } catch (error) {
    res.send({ status: 'Error', message: `User could not be upgrated! Detail: %${error}`})
  }
}