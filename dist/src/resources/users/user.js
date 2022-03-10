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
exports.UserModel = exports.ROLES = void 0;
const mongoose_1 = require("mongoose");
const stringTypes_utils_1 = require("../../utils/stringTypes.utils");
const otp_service_1 = __importDefault(require("../otp/otp.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const otp = new otp_service_1.default();
var ROLES;
(function (ROLES) {
    ROLES["ADMIN"] = "admin";
    ROLES["BASIC"] = "basic";
    ROLES["CUSTOMER"] = "customer";
})(ROLES = exports.ROLES || (exports.ROLES = {}));
const UserSchema = new mongoose_1.Schema({
    fullname: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone: {
        countrycode: { type: String, required: true },
        number: { type: String, required: true, unique: true },
    },
    password: { type: String },
    profile: { type: String, unique: true },
    username: { type: String },
    dashbord: {
        send: { type: Number },
        received: { type: Number },
        deliver: { type: Number },
    },
    region: { type: mongoose_1.Schema.Types.ObjectId, ref: "Regions" },
    status: { type: Boolean, default: false },
    role: { type: String, required: true, enum: [`${ROLES.ADMIN}`, `${ROLES.BASIC}`, `${ROLES.CUSTOMER}`], default: `${ROLES.CUSTOMER}` }
}, { timestamps: true });
// DO BEFORE CREATE USER ACOUNT
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.username = `ekvl@${(0, stringTypes_utils_1.randomCode)(6)}`;
        let password = "";
        if (this.role === ROLES.CUSTOMER) {
            this.dashbord = {
                send: 0,
                received: 0,
                deliver: 0,
            };
            password = `${this.password}`;
        }
        else {
            password = (0, stringTypes_utils_1.getRandomPassword)();
            this.status = true;
        }
        console.log('Password:', password);
        this.password = yield (0, stringTypes_utils_1.hashPassword)(password);
        next();
    });
});
UserSchema.post("save", function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc.role === ROLES.CUSTOMER) {
            const item = {
                user: doc._id,
                phone: doc.phone
            };
            yield otp.create("confirmation", item);
        }
    });
});
UserSchema.methods.comparePassword = function (userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(userPassword, this.password);
    });
};
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
