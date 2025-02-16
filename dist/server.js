"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
const logger_1 = require("./shared/logger");
let server;
//* Database Connection
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(index_1.default.database_url);
        logger_1.logger.info('✅ Database Connected');
        server = app_1.default.listen(index_1.default.port, () => logger_1.logger.info(`🚀 Server Up and Running`));
    }
    catch (error) {
        const err = error;
        logger_1.errorLogger.error(`Failed to connect to database: ${err.message}`, {
            stack: err.stack,
        });
        process.exit(1);
    }
});
dbConnect();
process.on('uncaughtException', (error) => {
    logger_1.errorLogger.error(`Uncaught Exception: ${error.message}`, {
        stack: error.stack,
    });
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_1.errorLogger.error(`Unhandled Rejection: ${reason}`, {
        stack: reason instanceof Error ? reason.stack : null,
    });
    process.exit(1);
});
//* Graceful Shutdown
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger_1.logger.info('HTTP server closed');
    });
});
