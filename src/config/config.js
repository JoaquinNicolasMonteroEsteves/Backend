import dotenv from 'dotenv';
// import { Command } from 'commander';

// const program = new Command();

// program
//     .option('-d', 'Variable para debug', false)
//     .option('-p <port>', 'Puerto del servidor', 8080)
//     .option('--mode <mode>', 'Modo de trabajo', 'develop')
// program.parse();

// const environment = program.opts().mode 
dotenv.config();
// dotenv.config({
//     path:environment === "production" ? "./src/config/.env.production" : ".src/config/.env.development"
// });

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
    // environment: environment
};
