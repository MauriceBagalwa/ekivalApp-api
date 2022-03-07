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
const schema_1 = require("../region/schema");
const logger_1 = __importDefault(require("../../utils/logger"));
class Etat {
    constructor() {
        this.etat = schema_1.EtatType;
        this.country = schema_1.CountryType;
    }
    /**
    * Find contry by Id
    */
    contryFind(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.country.findById({ _id, status: true });
        });
    }
    /**
     * Registre a new etat
     */
    registre(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this.contryFind(input.country)))
                    return [undefined, "Aucun pays trouver"];
                const item = new this.etat(input);
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
     * Get all etat
     */
    getAll(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, limit, offset } = item;
                const contries = yield this.etat.find({ status })
                    .sort({ _id: -1 })
                    .populate({ path: "country", select: "designation" })
                    .limit(limit * 1)
                    .skip(((offset <= 0 ? 1 : offset) - 1) * limit)
                    .exec();
                return contries;
            }
            catch (err) {
                logger_1.default.error(err.message);
                throw new Error(err.message);
            }
        });
    }
    /**
     * Update etat
     */
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.contryFind(input.country))
                    return [undefined, "Aucun pays trouver"];
                const saveResult = yield this.etat.findByIdAndUpdate({ _id: input.etatId }, input, { new: true });
                return saveResult
                    ? [saveResult, ""]
                    : [undefined, "Aucun etat trouver"];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, err.message];
            }
        });
    }
    /**
     * Remove etat
     */
    remove(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findetat = yield this.etat.findOne({ _id: input.etatId });
                if (!findetat)
                    return [undefined, "Aucun pays trouver"];
                yield findetat.deleteOne();
                return ["Etat supprimer avec succès.", ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, "err.message"];
            }
        });
    }
}
exports.default = Etat;
