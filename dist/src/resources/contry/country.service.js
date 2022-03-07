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
class Country {
    constructor() {
        this.contry = schema_1.CountryType;
    }
    /**
     * Registre a new contry
     */
    registre(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = new this.contry(input);
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
     * Get all contry
     */
    getAll(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, limit, offset } = item;
                const contries = yield this.contry.find({ status })
                    .sort({ _id: -1 })
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
     * Update contry
     */
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saveResult = yield this.contry.findByIdAndUpdate({ _id: input.countryId }, input, { new: true });
                return saveResult
                    ? [saveResult, ""]
                    : [undefined, "Aucun pays trouver"];
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
    remove(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findContry = yield this.contry.findOne({ _id: input.countryId });
                if (!findContry)
                    return [undefined, "Aucun pays trouver"];
                yield findContry.deleteOne();
                return ["Pays supprimer avec succès.", ""];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, "err.message"];
            }
        });
    }
}
exports.default = Country;
