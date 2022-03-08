"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailF = exports.signinFormat = exports.customerUF = exports.userF = exports.customerF = void 0;
const joi_1 = __importDefault(require("joi"));
exports.customerF = joi_1.default.object({
    fullname: joi_1.default.string().lowercase().required().trim(),
    phone: joi_1.default.object()
        .keys({
        countrycode: joi_1.default.string().required(),
        number: joi_1.default.number().required(),
    })
        .required(),
    email: joi_1.default.string().email().lowercase().required(),
    region: joi_1.default.string(),
    password: joi_1.default.string().required(),
});
exports.userF = joi_1.default.object({
    fullname: joi_1.default.string().lowercase().required().trim(),
    phone: joi_1.default.object()
        .keys({
        countrycode: joi_1.default.string().required(),
        number: joi_1.default.number().required(),
    })
        .required(),
    email: joi_1.default.string().email().lowercase().required(),
    role: joi_1.default.string().valid("admin", "basic")
});
exports.customerUF = joi_1.default.object({
    fullname: joi_1.default.string().lowercase().required().trim(),
    phone: joi_1.default.object()
        .keys({
        countrycode: joi_1.default.string().required(),
        number: joi_1.default.number().required(),
    })
        .required(),
    email: joi_1.default.string().email().lowercase().required(),
    region: joi_1.default.string().lowercase()
});
exports.signinFormat = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required(),
    password: joi_1.default.string().required(),
});
exports.emailF = joi_1.default.object({
    email: joi_1.default.string().email().lowercase().required()
});
