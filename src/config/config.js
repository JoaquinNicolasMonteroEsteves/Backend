import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
    .option('-d, --debug', 'Variable para debug', false)
    .option('-p, --port <port>', 'Puerto del servidor', 8080)
    .option('-m, --mode <mode>', 'Modo de trabajo', 'development')
program.parse();

export const environment = program.opts().mode

dotenv.config({
    path: environment === "production" ? "./src/config/.env.production" : program.opts().mode === "testing" ? "./src/config/.env.testing" : "./src/config/.env.development"
});


export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
    environment: environment
};
