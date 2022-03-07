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
const otp_1 = require("./otp");
const stringTypes_utils_1 = require("../../utils/stringTypes.utils");
const logger_1 = __importDefault(require("../../utils/logger"));
class Otp {
    constructor() {
        this.otp = otp_1.OtpModel;
    }
    create(index, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otp = (0, stringTypes_utils_1.randomCode)(6);
                let result = yield this.otp.updateOne({ user: item.user }, {
                    otp,
                    createAt: Date.now(),
                }, { upsert: true });
                (0, stringTypes_utils_1.sendSMS)(item.phone, `Ekival: votre code de ${index} est: ${otp}. Il expire dans 10 minutes.`);
                return [result, ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, "Une Erreur est survenu lors de l'enregistrement"];
            }
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.otp.deleteOne({ user: userId });
                return [result, ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, "Erreur de supprision."];
            }
        });
    }
    findOtp(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.otp.findOne({ use: false, user: input.userId, otp: input.otp });
            }
            catch (err) {
                logger_1.default.error(err.message);
                return null;
            }
        });
    }
    send(item, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = {
                user: item._id.toString(),
                phone: item.phone,
            };
            yield this.create("renitialisation", value);
        });
    }
}
exports.default = Otp;
