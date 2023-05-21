import GitHubStrategy from 'passport-github2'
import userModel from '../Services/models/user.model.js'
import passport from 'passport'
import passportLocal from 'passport-local'
import { cookieExtractor, create_hash, is_valid_password, private_key } from '../utils.js'
import jwtStrategy from 'passport-jwt'
import UserSerivce from '../Services/Users.Service.js'

const JWTStrategy = jwtStrategy.Strategy
const ExtractJWT = jwtStrategy.ExtractJwt

const localStrategy = passportLocal.Strategy

let US = new UserSerivce()


const initializePassport = () => {

    //Middleware para el uso de la estrategia de login por GitHub
    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.e7b05b62c1ea57b0",
        clientSecret: "ed33b2b25ddfd67f83bb2c0242fa061fd5d9a287",
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'

    }, async (accessToken, refreshToken, profile, done) =>{
        try {
            let user = await US.getUser({email:profile._json.email})
            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '-',
                    age: 18,
                    email: profile._json.email,
                    password:'-',
                    loggedBy: "Github"
                }
                let result = await US.createUser(newUser)
                return done(null, result)
            } else {
                return done(null,user)
            }
        } catch (error) {
            return done(error)
        }
    }))

    // REGISTER STRATEGY: 
  passport.use('register', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { first_name, last_name, email, age } = req.body
      try {
        if (!first_name || !last_name || !email || !age || !password) {
          console.log('Please, complete all the fields!')
          return done(null, false)
        } else {
          let exists = await US.getUser({email: email})
          if (exists) {
            console.log('An user with this email already exists')
            return done(null, false)
          }
          let newUser = {
            first_name,
            last_name,
            email,
            age,
            password: create_hash(password)
          }
          let result = await US.createUser(newUser)
          return done(null, result)
        }
      } catch (error) {
        return done(`An error occured while creating a new user. Check for ${error}`)
      }
    }
  ))
  
//LOGIN STRATEGY using jwt:
passport.use('login', new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
    secretOrKey: private_key
  },
  async (jwt_payload, done) => {
    try {
      return done(null, jwt_payload.user)
    } catch (error) {
      return done(`An error occured. Check for ${error}`)
    }
  }
))

  //SERIALIZE AND DESERIALIZE FUNCTIONS:
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await US.getUser({id: id})
      done(null, user)
    } catch (error) {
      console.error('An error ocurred while deserealizing the user:' + error)
    }
  })
}



export default initializePassport