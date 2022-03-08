"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletType = void 0;
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    designation: { type: String, required: true },
    adresse: { type: String, required: true, unique: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.WalletType = (0, mongoose_1.model)("wallet", fileSchema);
