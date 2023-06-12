import userModel from "./models/user.model.js";

export default class UserSerivce {
    //Create user
    createUser = async (user) => {
        try {
            let userCreated = await userModel.create(user)
            return userCreated
        }
        catch (error) {
            return (`Error creating a new user in database. Detail ${error}`)
        }
    }
    
    //Find user
    getUser = async (email = null, id = null) => {
        try {
            if (email) {
                const user = await userModel.findOne(email)
                return user
            }
            else if (id) {
                let user = await userModel.findById(id)
                return user
            }
        } catch (error) {
            return (`Error getting user from database. Detail ${error}`)
        }
    }

    updateUserCartID = async (userID, cartID) => {
        try {
          await userModel.findOneAndUpdate({ _id: userID }, {cart_id: cartID})
        } catch (error) {
          retrun `An error has occurred by updating a user. Error detail: ${error}`
        }
      }
}