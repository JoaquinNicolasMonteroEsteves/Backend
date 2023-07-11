import { create_hash } from "../utils.js";
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

    upgradeUser = async (email) => {
        try {
          await userModel.findOneAndUpdate({ email: email }, { role: 'premium' })
          let updatedUser = await userModel.findOne({ email: email })
          return updatedUser
        } catch (error) {
          return `An error has ocurred by consulting user database. Error detail: ${error}`
        }
    }

    restorePass = async (email, pass) => {
        try {
            let currentPass = (await userModel.findOne({email:email})).password
            let newPass = create_hash(pass)
            console.log(`Actual: ` + currentPass);
            console.log(`Nueva: ` + newPass);
            if(currentPass == newPass) {
                return {status: 503, message: `The new password must be different to the current one.`}
            }
            // Lógica de cambio de pass
        } catch (error) {
            return `An error has ocurred when trying to change password. Error detail: ${error}`
        }
    }

}