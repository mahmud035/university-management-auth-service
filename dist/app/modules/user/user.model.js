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
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const UserSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: 0, // hide password field
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student', // Reference with Student Model
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Faculty', // Reference with Faculty Model
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin', // Reference with Admin Model
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Instance Method
UserSchema.methods.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ id }, { id: 1, role: 1, password: 1, needsPasswordChange: 1 });
    });
};
// Instance Method
UserSchema.methods.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
// User.create() / user.save()
//* Hashing user password
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this; // here, this equals to user object
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        // NOTE: (For 19-4 Alternative way to change password)
        if (!user.needsPasswordChange) {
            user.passwordChangedAt = new Date();
        }
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
