"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariables = () => {
    const requiredEnvVariables = [
        "PORT",
        "MONGO_URI",
        "NODE_ENV",
        "JWT_ACCESS_EXPIRES",
        "JWT_ACCESS_SECRET",
        "JWT_REFRESH_SECRET",
        "JWT_REFRESH_EXPIRES",
        "STRIPE_SECRET_KEY",
        "STRIPE_WEBHOOK_SECRET",
    ];
    requiredEnvVariables.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variabl ${key}`);
        }
    });
    return {
        PORT: process.env.PORT,
        MONGO_URI: process.env.MONGO_URI,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    };
};
exports.envVars = loadEnvVariables();
