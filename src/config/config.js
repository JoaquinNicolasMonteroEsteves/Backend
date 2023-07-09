import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
    .option('-d, --debug', 'Variable para debug', false)
    .option('-p, --port <port>', 'Puerto del servidor', 8080)
    .option('-m, --mode <mode>', 'Modo de trabajo', 'development')
program.parse();

// console.log("Options: ", program.opts());
// console.log("Mode option: ", program.opts().mode);
// console.log("Remaining arguments: " + program.args);

// dotenv.config();
dotenv.config({
    path: program.opts().mode === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
});


export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
    environment: program.opts().mode
};
