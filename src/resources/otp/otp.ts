import { Schema, model } from "mongoose";
import { randomCode } from "../../utils/stringTypes.utils";

import { IPhone } from '../users/user'

export interface IOtp {
  otpId?: string;
  userId?: string;
  user: string;
  otp?: number;
  phone: IPhone;
}

const OtpSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  otp: { type: Number },
  use: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now(), index: { expires: 600 } },
});

OtpSchema.pre<IOtp>("save", function (next) {
  this.otp = randomCode(6)
  next()
})

export const OtpModel = model("Otp", OtpSchema);
