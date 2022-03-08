import { Schema, model, Types } from "mongoose";

export interface IWalletType {
      designation: string,
      adresse: string,
      user?: string
      walletId?: string;
}

const fileSchema = new Schema({
      designation: { type: String, required: true },
      adresse: { type: String, required: true, unique: true },
      user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const WalletType = model("wallet", fileSchema);