"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionType = exports.EtatType = exports.CountryType = void 0;
const mongoose_1 = require("mongoose");
const CountrySchema = new mongoose_1.Schema({
    designation: {
        type: String, required: true, unique: true, lowercase: true
    },
    countrycode: { type: String, required: true, unique: true },
    index: { type: String, required: true, unique: true, uppercase: true },
    flag: { type: String, default: "images/flag-default.png" },
    status: { type: Boolean, default: true }
}, { timestamps: true });
const EtatSchema = new mongoose_1.Schema({
    designation: { type: String, required: true, unique: true },
    country: { type: mongoose_1.Schema.Types.ObjectId, ref: "Countries" },
    status: { type: Boolean, default: true }
}, { timestamps: true });
const RegionSchema = new mongoose_1.Schema({
    designation: { type: String, required: true, unique: true },
    etat: { type: mongoose_1.Schema.Types.ObjectId, ref: "Etats" },
    status: { type: Boolean, default: true }
}, { timestamps: true });
exports.CountryType = (0, mongoose_1.model)("Countries", CountrySchema);
exports.EtatType = (0, mongoose_1.model)("Etats", EtatSchema);
exports.RegionType = (0, mongoose_1.model)("Regions", RegionSchema);
