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
const schema_1 = require("./schema");
const logger_1 = __importDefault(require("../../utils/logger"));
class RegionService {
    /**
        * Find contry by Id
        */
    etatFind(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.RegionType.findById({ _id, status: true });
        });
    }
    /**
     * Registre a new contry
     */
    registre(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this.etatFind(input.etat)))
                    return [undefined, "Aucune region trouver"];
                const item = new schema_1.RegionType(input);
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
                const contries = yield schema_1.RegionType.find({ status })
                    .sort({ _id: -1 })
                    .populate({ path: "etat", select: "designation contry" })
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
                if (!(yield this.etatFind(input.etat)))
                    return [undefined, "Aucun etat trouver"];
                const saveResult = yield schema_1.RegionType.findByIdAndUpdate({ _id: input.regionId }, input, { new: true });
                return saveResult
                    ? [saveResult, ""]
                    : [undefined, "Aucune region trouver"];
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
                const result = yield schema_1.RegionType.findByIdAndDelete({ _id: input.regionId });
                return result ? ["Region supprimer avec succès.", ""] : [undefined, "Aucune Region trouver"];
            }
            catch (err) {
                logger_1.default.error(err.message);
                return [undefined, "err.message"];
            }
        });
    }
}
exports.default = RegionService;
