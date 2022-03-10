import { Schema, Document, Types, model } from 'mongoose'

const CountrySchema = new Schema({
      designation: {
            type: String, required: true, unique: true, lowercase: true
      },
      countrycode: { type: String, required: true, unique: true },
      index: { type: String, required: true, unique: true, uppercase: true },
      flag: { type: String, default: "images/flag-default.png" },
      status: { type: Boolean, default: true }
}, { timestamps: true })

const EtatSchema = new Schema({
      designation: { type: String, required: true, unique: true },
      country: { type: Schema.Types.ObjectId, ref: "Countries" },
      status: { type: Boolean, default: true }
}, { timestamps: true })

const RegionSchema = new Schema({
      designation: { type: String, required: true, unique: true },
      etat: { type: Schema.Types.ObjectId, ref: "Etats" },
      status: { type: Boolean, default: true }
}, { timestamps: true })

export interface IBase {
      designation: string,
      status?: boolean
}

export interface ICountryType extends IBase {
      index: string,
      countrycode: string,
      flag?: string
      countryId?: string,
}

export interface IEtatType extends IBase {
      etatId?: string,
      country: string
}

export interface IRegionType extends IBase {
      regionId?: string,
      etat: string,
}

export const CountryType = model<ICountryType>("Countries", CountrySchema)
export const EtatType = model<IEtatType>("Etats", EtatSchema)
export const RegionType = model<IRegionType>("Regions", RegionSchema)

