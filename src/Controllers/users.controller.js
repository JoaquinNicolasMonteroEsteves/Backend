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

export const restorePass = async (req, res) => {
  try {
    let email = req.body.user
    if (req.body.pass != req.body.repeat-pass) {
      res.status(502).json()
    }
    let result = await US.restorePass(email, req.body.pass)
    if(result.status == 503) {
      res.status(503).json()
    }
    res.status(201).send(result)
  } catch (error) {
    res.send({ status: 'Error', message: `Password couldn't be changed! Detail: %${error}`})
  }
}