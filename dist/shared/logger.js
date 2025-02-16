"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf } = winston_1.format;
// Custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
    // Ensure `timestamp` is a valid string or number
    if (typeof timestamp !== 'string' && typeof timestamp !== 'number') {
        throw new Error('Invalid timestamp format');
    }
    const date = new Date(timestamp);
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${date.toISOString().split('T')[0]} ${hour}:${minutes}:${seconds} [${label}] ${level.toUpperCase()}: ${message}`;
});
// Success Logger
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(label({ label: 'APP' }), timestamp(), myFormat),
    transports: [
        // Console Transport
        new winston_1.transports.Console({
            format: combine(winston_1.format.colorize(), myFormat), // Colorized logs for console
        }),
        // Daily Rotate File for Success Logs
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'successes', 'app-%DATE%-success.log'),
            datePattern: 'YYYY-MM-DD', // Standard date pattern
            zippedArchive: true,
            maxSize: '20m', // 20MB
            maxFiles: '3d', // Retain logs for 3 days
        }),
    ],
});
// Error Logger
exports.errorLogger = (0, winston_1.createLogger)({
    level: 'error',
    format: combine(label({ label: 'ERROR' }), timestamp(), myFormat),
    transports: [
        // Console Transport
        new winston_1.transports.Console({
            format: combine(winston_1.format.colorize(), myFormat), // Colorized logs for console
        }),
        // Daily Rotate File for Error Logs
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'app-%DATE%-error.log'),
            datePattern: 'YYYY-MM-DD', // Standard date pattern
            zippedArchive: true,
            maxSize: '20m', // 20MB
            maxFiles: '3d', // Retain error logs for 3 days
        }),
    ],
});
// logs/winston/
// successes/success.log
// errors/error.log
