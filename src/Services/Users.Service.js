import { getDiffTime, hourTime } from "../utils.js";
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
    
    //Find a single user
    getUser = async (email = null, id = null) => {
        try {
            if (email) {
                let user = await userModel.findOne(email)
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

    //Bring all users
    getUsers = async () => {
        try {
            let users = await userModel.find({}, {"_id":0, "first_name":1, "email":1, "role":1 })
            return users
        } catch (error) {
            retrun `An error has occurred while getting all users. Error detail: ${error}`  
        }
    }

    //Bring idle users to be deleted
    getIdleUsers = async () => {
        try {
            let Users = await userModel.find({"role": {$not: {$eq: "admin"}}}, {"_id": 0, "email": 1, "last_connection":1, "cart_id":1})
            let idleUsers = []
            let nowTime = hourTime()
            Users.forEach((u) => {
                let diff = getDiffTime(u.last_connection, nowTime)
                if(diff >= 48) {
                    idleUsers.push(u)
                }
            })
            return idleUsers
        } catch(error) {
            return `An error has occurred while getting idle users. Error detail: ${error}`  
        }
    }

    //Delete idle users
    deleteIdleUsers = async (users) => {
        try {
            users.forEach(async (u) => {
                let removedUser = await userModel.findOneAndRemove({email: u.email})
                await userModel.insertMany(removedUser) // Uso para testing, quitar luego
            })
            return 
        } catch (error) {
            return `An error has occurred while deleting idle users. Error detail: ${error}`
        }
    }

    updateUserCartID = async (userID, cartID) => {
        try {
          await userModel.findOneAndUpdate({ _id: userID }, {cart_id: cartID})
        } catch (error) {
          retrun `An error has occurred while updating a user. Error detail: ${error}`
        }
    }

    upgradeUser = async (email) => {
        try {
          await userModel.findOneAndUpdate({ email: email }, { role: 'premium' })
          let updatedUser = await userModel.findOne({ email: email })
          return updatedUser
        } catch (error) {
          return `An error has ocurred while consulting user database. Error detail: ${error}`
        }
    }

    restorePass = async (email, pass) => {
        try {
            await userModel.findOneAndUpdate({email: email}, {password: pass})
            let updatedUser = await userModel.findOne({email:email})
            return updatedUser
        } catch (error) {
            return `An error has ocurred when trying to change password. Error detail: ${error}`
        }
    }

    uploadDocs = async (files, email) => {
        try {
            await userModel.findOneAndUpdate({email: email}, {
                documents: files,
                status: 1
            })
            return true
        } catch (error) {
            return `An error has ocurred when trying to upload document information. Error detail: ${error}`
        }
    }
}