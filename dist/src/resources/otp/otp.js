"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = require("mongoose");
const OtpSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    otp: { type: Number },
    use: { type: Boolean, default: false },
    createAt: { type: Date, default: Date.now(), index: { expires: 600 } },
});
// OtpSchema.pre<IOtp>("save", function (next) {
//   this.otp = randomCode(6)
//   next()
// })
exports.OtpModel = (0, mongoose_1.model)("Otp", OtpSchema);
