export default class userDTO {
    constructor (user){
        this.name = `${user.last_name}, ${user.first_name}`
        this.email = user.email
        this.age = user.age
        this.role = user.role
        this.cart_id = user.cart_id
    }
}