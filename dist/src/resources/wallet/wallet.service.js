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
const wallet_1 = require("./wallet");
const user_1 = require("../users/user");
const logger_1 = __importDefault(require("../../utils/logger"));
class Wallet {
    constructor() {
        this.wallet = wallet_1.WalletType;
        this.user = user_1.UserModel;
    }
    /**
     * Registre a wallet
     */
    /**
     * Find Etat by Id
     */
    findUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.user.findById({ _id, status: true });
        });
    }
    findWallet(filter, index) {
        return __awaiter(this, void 0, void 0, function* () {
            return [
                yield this.wallet.findOne(filter),
                index == 0
                    ? "Designation ou adresse déjà utiliser"
                    : "Aucun wallet trouver.",
            ];
        });
    }
    /**
     * Registre a new contry
     */
    registre(userId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this.findUser(userId)))
                    return [undefined, "Aucun utilisateur trouver"];
                const { designation, adresse } = input;
                const result = yield this.findWallet({ user: userId, designation, adresse }, 0);
                if (result[0])
                    return [undefined, result[1]];
                input.user = userId;
                const item = new this.wallet(input);
                const saveResult = yield item.save();
                return [saveResult, ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, err.message];
            }
        });
    }
    /**
     * Get all wallet for user x
     */
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wallets = yield this.wallet
                    .find({ user: userId })
                    .populate({ path: "user", select: "fullname" })
                    .sort({ _id: -1 })
                    .select("-user")
                    .exec();
                return wallets;
            }
            catch (err) {
                logger_1.default.error(err.message);
                throw new Error(err.message);
            }
        });
    }
    /**
     * Update contry
     */
    update(userId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { walletId, designation, adresse } = input;
                const isUsed = yield this.findWallet({ user: userId, designation, adresse, _id: { $ne: { _id: walletId } } }, 0);
                if (isUsed[0])
                    return [undefined, isUsed[1]];
                const saveResult = yield this.wallet.findByIdAndUpdate({ _id: walletId }, { designation, adresse }, { new: true });
                return saveResult
                    ? [saveResult, ""]
                    : [undefined, "Aucun wallet trouver"];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, err.message];
            }
        });
    }
    /**
     * Remove contry
     */
    remove(userId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.wallet.findByIdAndDelete({
                    _id: input.walletId,
                    user: userId
                });
                return result
                    ? ["wallet supprimer avec succès.", ""]
                    : [undefined, "Aucun wallet trouver"];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, err.message];
            }
        });
    }
}
exports.default = Wallet;
