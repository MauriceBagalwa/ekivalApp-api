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
exports._update = void 0;
const user_validate_1 = require("./user.validate");
const validate_resource_1 = require("../../middleware/validate.resource");
const user_1 = require("./user");
const stringTypes_utils_1 = require("../../utils/stringTypes.utils");
const file_service_1 = require("../file/file.service");
const schema_1 = require("../region/schema");
const otp_service_1 = __importDefault(require("../otp/otp.service"));
const logger_1 = __importDefault(require("../../utils/logger"));
const token_1 = __importDefault(require("../../utils/token"));
function _update(_id, item) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.UserModel.findByIdAndUpdate({ _id }, item, { new: true });
    });
}
exports._update = _update;
class UsersService {
    constructor() {
        this.user = user_1.UserModel;
        this.region = schema_1.RegionType;
        this.otp = new otp_service_1.default();
        // lolo@gamil.com::iA5l5LohyU
    }
    /**
     * Get all users()
     * with index parmas
     */
    getAll(status = true, offset, limit, index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = index
                    ? { status, role: user_1.ROLES.CUSTOMER }
                    : { status, role: { $ne: user_1.ROLES.CUSTOMER } };
                const users = this.user
                    .find(filter)
                    .populate(index ? { path: "region", select: "designation" } : null)
                    .sort({ _id: -1 })
                    .limit(limit * 1)
                    .select('-password')
                    .skip(((offset <= 0 ? 1 : offset) - 1) * limit)
                    .exec();
                return users;
            }
            catch (err) {
                logger_1.default.error(err.message);
                throw new Error(err.message);
            }
        });
    }
    /**
     * Register a new User
     */
    registre(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const withRegion = input === null || input === void 0 ? void 0 : input.region;
                const formatItem = yield (0, validate_resource_1.validateSchema)(withRegion ? user_validate_1.customerF : user_validate_1.userF, input);
                if (withRegion)
                    if (!(yield this.region.findById({ _id: input.region, status: true }))) {
                        return [
                            undefined,
                            `la region selectionnern'est pas pris en charge.`,
                        ];
                    }
                const { email, phone } = input;
                yield this.user.findOne({ status: false, email, "phone.number": phone.number });
                const value = new this.user(formatItem);
                const saveUser = yield value.save();
                return [saveUser, ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Update a User data
     */
    update(userId, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const withRegion = item === null || item === void 0 ? void 0 : item.region;
                const formateItem = yield (0, validate_resource_1.validateSchema)(user_validate_1.customerUF, item);
                if (withRegion)
                    if (!(yield this.region.findById({ _id: item.region, status: true }))) {
                        return [
                            undefined,
                            `la region selectionnern'est pas pris en charge.`,
                        ];
                    }
                const result = yield _update(userId, formateItem);
                return result ? [result, ``] : [undefined, `Aucun utilisateur trouver.`];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    profile(userId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const urlProfile = yield (0, file_service_1.profile)(file);
                if (!urlProfile[0])
                    return [undefined, urlProfile[1]];
                const result = yield _update(userId, { profile: urlProfile[1] });
                return result ? [true, `Profile modifier.`] : [undefined, `Aucun utilisateur trouver.`];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Update a phone number for user
     * on signUp
     */
    changePhone(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let value = {
                    phone: item.phone
                };
                const result = yield _update(item.userId, value);
                if (!result)
                    return [undefined, `Aucun utilisateur trouver.`];
                yield this.otp.send(result, "confirmation");
                return [result, ``];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
    * Resend otp
    */
    resendOTP(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield this.user.findOne({ email: item.email, status: false });
                if (!find)
                    return [undefined, `Aucun utilisateur trouver.`];
                yield this.otp.send(find, "confirmation");
                return [find, ``];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Active Acount
     */
    activeAccount(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let findOtp;
                let result;
                const findUser = yield this.user.findOne({ email: item.email, status: false });
                if (findUser) {
                    item.userId = findUser._id;
                    findOtp = yield this.otp.findOtp(item);
                    console.log(`Etat Otp: ${findOtp ? true : false}`);
                    if (findOtp) {
                        result = yield _update(item.userId, { status: true });
                    }
                }
                return (findUser && result) ? [result, token_1.default.createToken(result._id, result.role)]
                    : [undefined, `Code incorrect ou déjà expirer.`];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Signin
     */
    login(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, validate_resource_1.validateSchema)(user_validate_1.signinFormat, item);
                let user, find;
                user = yield this.user.findOne({ email: item.email, status: true });
                if (user) {
                    find = yield user.comparePassword(item.password);
                }
                const message = !user ? "Vous devez d'abord activez votre compte."
                    : "Adresse email ou mot de passe incorrect.";
                return (user && find) ? [user, token_1.default.createToken(user._id, user.role)]
                    : [undefined, message];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Update password
     */
    changePassword(userId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne({ _id: userId, status: true });
                if (!user)
                    return [undefined, `Aucun utilisateur trouver.`];
                if (!(yield user.comparePassword(input.oldPassword)))
                    return [undefined, `Ancien mot de passe  incorrect.`];
                yield user.updateOne({ password: yield (0, stringTypes_utils_1.hashPassword)(input.password) });
                return [true, ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Update a status of acount
     */
    status(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield this.user.findOne({ _id: input.userId });
                if (!find)
                    return [undefined, `Aucun utilisateur trouver.`];
                const result = yield this.user.findByIdAndUpdate({ _id: input.userId }, { status: !find.status }, { new: true });
                return [result, ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Send otp for restore password
     */
    sendRestoreCode(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, validate_resource_1.validateSchema)(user_validate_1.emailF, input);
                const findUser = yield this.user.findOne({ email: input.email });
                if (!findUser)
                    return [undefined, `Aucun utilisateur trouver.`];
                yield this.otp.send(findUser, "renitialisation");
                return [findUser, ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Get token to restore password
     */
    getTokenToRestorePsswd(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findOtp = yield this.otp.findOtp(input);
                if (!findOtp)
                    return [undefined, `Code saisi est incorrect ou déjà expirer.`];
                const user = yield this.user.find({ _id: input.userId });
                yield this.otp.delete(input.userId);
                return [token_1.default.createToken(user._id, user.role), ``];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
     * Restore password
     */
    RestorePassword(userId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.user.findByIdAndUpdate({ _id: userId }, { password: yield (0, stringTypes_utils_1.hashPassword)(input.password) });
                if (!result)
                    return [undefined, `Aucun utilisateur trouver.`];
                return [result, ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, `${err.message}`];
            }
        });
    }
    /**
    * Remove contry
    */
    remove(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.user.findByIdAndDelete({ _id: input.userId });
                return result ? ["Utilisateur supprimer avec succès.", ""] : [undefined, "Aucune Utilisateur trouver"];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, "err.message"];
            }
        });
    }
}
exports.default = UsersService;
