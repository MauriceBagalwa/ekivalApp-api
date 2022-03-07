"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    addby: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
module.exports = (0, mongoose_1.model)("File", fileSchema);
