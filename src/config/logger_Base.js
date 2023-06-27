import winston from 'winston'
import config from './config.js'

const customLevelOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
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
                level: "debug",
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
    req.logger.info(`${req.method} in ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
    next()
}