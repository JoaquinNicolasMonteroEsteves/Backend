export const createUserFieldsError = (user) => {
    return `One or more properties are incomplete or invalid.
    List of requires properties:
      * first_name: type String, received: ${user.first_name}
      * last_name: type String, received: ${user.last_name}
      * email: type String, received: ${user.email}
      * age: type Number, received: ${user.age}
      * password: type String, received: ${user.password}
    `
  }
  
  export const createUserDuplicareError = (user) => {
    return `${user.email} is already registered with another user`
  }