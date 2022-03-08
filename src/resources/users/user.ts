import { Schema, Document, model } from "mongoose";
import { IOtp } from "../otp/otp";
import { randomCode, hashPassword, getRandomPassword } from "../../utils/stringTypes.utils";
import service from '../otp/otp.service'
import bcrypt from 'bcrypt'

const otp = new service()

export enum ROLES {
      ADMIN = "admin",
      BASIC = "basic",
      CUSTOMER = "customer",
}

export interface IPhone {
      countrycode: string;
      number: number;
}
export interface IDashbord {
      send: number
      received: number
      deliver: number
}

export interface IUserType extends Document {
      userId?: string;
      fullname: string;
      email: string;
      phone: IPhone;
      username?: string;
      password?: string;
      dashbord: IDashbord;
      status?: boolean;
      role: ROLES;
      token: string;
      comparePassword(userPassword: string): Promise<Boolean>
}

const UserSchema = new Schema({
      fullname: { type: String, required: true, lowercase: true },
      email: { type: String, required: true, lowercase: true, unique: true },
      phone: {
            countrycode: { type: String, required: true },
            number: { type: String, required: true, unique: true },
      },
      password: { type: String },
      profile: { type: String, default: "images/default-profile.png" },
      username: { type: String },
      dashbord: {
            send: { type: Number },
            received: { type: Number },
            deliver: { type: Number },
      },
      region: { type: Schema.Types.ObjectId, ref: "Regions" },
      status: { type: Boolean, default: false },
      role: { type: String, required: true, enum: [`${ROLES.ADMIN}`, `${ROLES.BASIC}`, `${ROLES.CUSTOMER}`], default: `${ROLES.CUSTOMER}` }
}, { timestamps: true });

// DO BEFORE CREATE USER ACOUNT
UserSchema.pre<IUserType>("save", async function (next) {
      this.username = `ekvl@${randomCode(6)}`;
      let password = ""
      if (this.role === ROLES.CUSTOMER) {
            this.dashbord = {
                  send: 0,
                  received: 0,
                  deliver: 0,
            }
            password = `${this.password}`
      }
      else {
            password = getRandomPassword()
            this.status = true
      }
      console.log('Password:', password);
      this.password = await hashPassword(password);
      next()
});

UserSchema.post<IUserType>("save", async function (doc) {
      if (doc.role === ROLES.CUSTOMER) {
            const item: IOtp = {
                  user: doc._id,
                  phone: doc.phone
            }
            await otp.create("confirmation", item)
      }
});

UserSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
      return await bcrypt.compare(userPassword, this.password)
}

export const UserModel = model<IUserType>("User", UserSchema);

