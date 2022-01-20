"use strict";

require("dotenv").config();

const developmentEnviroNment = process.env.NODE_ENV;
const isProduction = developmentEnviroNment === "production"; 
module.exports = {
    port: process.env.PORT,
    isProduction,
    expireDurations: {
        tokenExpireAt: 8.64e+7,
        verificationExpireAt: 8.64e+7 * 3,
        passwordResetExpireAt: 8.64e+7 * 3,
    },
    mongoDb: {
        developmentUri: process.env.DEVELOPMENT_MONGODB_URI,
        productionUri: process.env.PRODUCTION_MONGODB_URI,
    },
    secrets: {
        adminSecret: process.env.ADMIN_SECRET,
        patientSecret: process.env.PATIENT_SECRET,
        verificationSecret:  process.env.VERIFICATION_SECRET,
        passwordResetSecret: process.env.PASSWORD_RESET_SECRET,
        deleteAccountSecret: process.env.DELETE_ACCOUNT_SECRET,
        cookieSecret: process.env.COOKIE_SECRET,
        saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
    },
}