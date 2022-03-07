"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = exports.randomCode = exports.hashPassword = exports.getRandomPassword = void 0;
var messagebird = require("messagebird")("bJwOZ42MJ4widd7laI1lyIqHc");
const bcrypt = __importStar(require("bcrypt"));
const generate_password_1 = require("generate-password");
function getRandomPassword() {
    return (0, generate_password_1.generate)({
        length: 10,
        numbers: true,
        uppercase: true,
        lowercase: true
    });
}
exports.getRandomPassword = getRandomPassword;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(10);
        const hash = yield bcrypt.hash(password, salt);
        return hash;
    });
}
exports.hashPassword = hashPassword;
;
function randomCode(length) {
    return Math.floor(Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}
exports.randomCode = randomCode;
function sendSMS(phone, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const number = `${phone.countrycode}${phone.number}`;
        var params = {
            // originator: config.get<string>('originator'),
            originator: "Ekivall",
            recipients: [`${number}`],
            body: message,
        };
        console.log(message);
        yield messagebird.messages.create(params, function (err, response) {
            if (err) {
                return console.log(err);
            }
        });
    });
}
exports.sendSMS = sendSMS;
