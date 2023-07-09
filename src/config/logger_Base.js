import winston from 'winston'
import config from './config.js'

const customLevelOptions = {
    levels: {
        debug: 5,
        http: 4,
        info: 3,
        warning: 2,
        error: 1,
        fatal: 0
    }, 
    colors: {
        debug: 'green',
        http: 'white',
        info: 'blue',
        warning: 'yellow',
        error: 'black',
        fatal: 'red'
    }
}

const loggerDev = winston.createLogger({
    levels: customLevelOptions.levels,
    //Declaro el transporter: 
    transports: [
        new winston.transports.Console(
            { 
                level: "fatal",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
                )
            }
        )
    ]
})

const loggerProd = winston.createLogger({
    levels: customLevelOptions.levels,
    //Declaro el transporter: 
    transports: [
        new winston.transports.Console(
            { 
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
                )
            }
        ),
        new winston.transports.File(
            { 
                filename: './errors.log', 
                level: "error",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
                )
            }
        )
    ]
})

export const addLogger = (req, res, next) => {
    if (config.environment === 'production') {
        req.logger = loggerProd
    } else {
        req.logger = loggerDev
    }
    next()
}