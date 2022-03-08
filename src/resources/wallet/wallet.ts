import { Schema, model, Types } from "mongoose";

export interface IWalletType {
      walletId?: string;
      designation: string,
      adresse: string,
      user?: string
}

const fileSchema = new Schema({
      designation: { type: String, required: true },
      adresse: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "User" },
});

export const WalletType = model("wallet", fileSchema);