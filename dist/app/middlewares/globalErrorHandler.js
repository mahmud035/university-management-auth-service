"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const index_1 = __importDefault(require("../../config/index"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const globalErrorHandler = (error, req, res, next) => {
    index_1.default.env === 'development'
        ? console.log('🚀 globalErrorHandler ~', { error })
        : console.log('🚀 globalErrorHandler ~', error);
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifyError = (0, handleValidationError_1.default)(error);
        // set response according to handleValidationError response
        statusCode = simplifyError.statusCode;
        message = simplifyError.message;
        errorMessages = simplifyError.errorMessages;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedZodError = (0, handleZodError_1.default)(error);
        // set response according to handleZodError response
        statusCode = simplifiedZodError.statusCode;
        message = simplifiedZodError.message;
        errorMessages = simplifiedZodError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedCastError = (0, handleCastError_1.default)(error);
        // set response according to handleCastError response
        statusCode = simplifiedCastError.statusCode;
        message = simplifiedCastError.message;
        errorMessages = simplifiedCastError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: index_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
// path:
// message:
