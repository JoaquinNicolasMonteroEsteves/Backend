export const createPasswordError = () => {
    return `Your new password must meet the following requirements:
      * It can not be an empty string.
      * Both password fields must match.
      * You are not allowed to use your current password.
      * You should also check if your not using an expired link.
    `
  }
  
export const expiredLinkError = () => {
  return 'The link you are using to restore your password is already expired, please generate a new link!'
}