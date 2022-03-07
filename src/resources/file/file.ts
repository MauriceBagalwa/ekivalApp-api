import { Schema, model, Types } from "mongoose";

export interface IFileType {
      name: string,
      type: string,
      addby?: string
}

const fileSchema = new Schema({
      name: { type: String, required: true },
      type: { type: String, required: true },
      addby: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("File", fileSchema);