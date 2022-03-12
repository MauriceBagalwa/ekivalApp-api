import { customerF, customerUF, userF, signinFormat, emailF } from "./user.validate";
import { validateSchema } from "../../middleware/validate.resource";
import { IUserType, UserModel, IPhone, ROLES } from "./user";
import { hashPassword } from "../../utils/stringTypes.utils";
import { profile } from "../file/file.service";
import { RegionType } from "../region/schema";
import service from "../otp/otp.service";
import logger from "../../utils/logger";
import token from "../../utils/token";
import { IOtp } from "../otp/otp";

export interface ICustomerRequest {
  userId?: string;
  fullname: string;
  email: string;
  phone: IPhone;
  region?: string;
  password?: string;
  profile: string;
  oldPassword?: string;
  role?: string;
  otp?: string;
}

export async function _update(_id: any, item: any) {
  return await UserModel.findByIdAndUpdate(
    { _id },
    item,
    { new: true }
  );
}

export default class UsersService {
  private user = UserModel;
  private region = RegionType;
  private otp = new service();

  /**
   * Get all users() 
   * with index parmas
   */
  public async getAll(
    status: boolean = true,
    offset: number,
    limit: number,
    index: boolean
  ): Promise<any> {
    try {
      const filter = index
        ? { status, role: ROLES.CUSTOMER }
        : { status, role: { $ne: ROLES.CUSTOMER } };
      const users = this.user
        .find(filter)
        .populate(index ? { path: "region", select: "designation" } : null)
        .sort({ _id: -1 })
        .limit(limit * 1)
        .select('-password')
        .skip(((offset <= 0 ? 1 : offset) - 1) * limit)
        .exec();
      return users;
    } catch (err: any) {
      logger.error(err.message);
      throw new Error(err.message);
    }
  }

  /**
   * Register a new User
   */
  public async registre(
    input: ICustomerRequest
  ): Promise<[type: IUserType | undefined, error: string]> {
    try {
      const withRegion = input?.region
      const formatItem = await validateSchema(withRegion ? customerF : userF, input);

      if (withRegion)
        if (!await this.region.findById({ _id: input.region, status: true })) {
          return [
            undefined,
            `la region selectionnern'est pas pris en charge.`,
          ]
        }

      const { email, phone } = input
      await this.user.findOne({ status: false, email, "phone.number": phone.number })

      const value = new this.user(formatItem);
      const saveUser = await value.save();
      return [saveUser as IUserType, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Update a User data
   */
  public async update(
    userId: string,
    item: Omit<ICustomerRequest, "password" | "role" | "oldPassword">
  ): Promise<any> {
    try {
      const withRegion = item?.region
      const formateItem = await validateSchema(customerUF, item);
      if (withRegion)
        if (!await this.region.findById({ _id: item.region, status: true })) {
          return [
            undefined,
            `la region selectionnern'est pas pris en charge.`,
          ]
        }

      const result = await _update(userId, formateItem)
      return result ? [result as IUserType, ``] : [undefined, `Aucun utilisateur trouver.`]
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  public async profile(
    userId: string,
    file: Express.Multer.File
  ): Promise<[type: boolean | undefined, error: string]> {
    try {
      const urlProfile = await profile(file)
      if (!urlProfile[0]) return [undefined, urlProfile[1]];
      const result = await _update(userId, { profile: urlProfile[1] })
      return result ? [true, `Profile modifier.`] : [undefined, `Aucun utilisateur trouver.`]
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Update a phone number for user
   * on signUp
   */
  public async changePhone(
    item: Pick<ICustomerRequest, "userId" | "phone">
  ): Promise<[type: IUserType | undefined, error: string]> {
    try {
      let value: object = {
        phone: item.phone
      }
      const result = await _update(item.userId, value)
      if (!result) return [undefined, `Aucun utilisateur trouver.`];
      await this.otp.send(result, "confirmation");
      return [result, ``];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
  * Resend otp 
  */
  public async resendOTP(
    item: Pick<ICustomerRequest, "email">
  ): Promise<[type: IUserType | undefined, error: string]> {
    try {
      const find = await this.user.findOne({ email: item.email, status: false });
      if (!find) return [undefined, `Aucun utilisateur trouver.`];
      await this.otp.send(find, "confirmation");
      return [find, ``];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Active Acount
   */
  public async activeAccount(
    item: IOtp
  ): Promise<[type: IUserType | undefined, error: string]> {
    try {
      let findOtp
      let result
      const findUser = await this.user.findOne({ email: item.email, status: false });
      if (findUser) {
        item.userId = findUser._id
        findOtp = await this.otp.findOtp(item)
        console.log(`Etat Otp: ${findOtp ? true : false}`)
        if (findOtp) {
          result = await _update(item.userId, { status: true })
        }
      }
      return (findUser && result) ? [result as IUserType, token.createToken(result._id, result.role)]
        : [undefined, `Code incorrect ou déjà expirer.`]
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Signin
   */
  public async login(
    item: Pick<ICustomerRequest, "email" | "password">
  ): Promise<[type: IUserType | undefined, error: string]> {
    try {
      await validateSchema(signinFormat, item);
      let user, find
      user = await this.user.findOne({ email: item.email });

      if (user)
        if (user.status)
          find = await user.comparePassword(item.password as string);

      const message = (user && !user.status) ? "Vous devez d'abord activez votre compte."
        : "Adresse email ou mot de passe incorrect."

      return (user && find) ? [user as IUserType, token.createToken(user._id, user.role)]
        : [undefined, message];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Update password
   */
  public async changePassword(
    userId: string,
    input: Pick<ICustomerRequest, "password" | "oldPassword">
  ): Promise<[type: Boolean | undefined, err: string]> {
    try {
      const user = await this.user.findOne({ _id: userId, status: true });
      if (!user) return [undefined, `Aucun utilisateur trouver.`];
      if (!await user.comparePassword(input.oldPassword as string))
        return [undefined, `Ancien mot de passe  incorrect.`];
      await user.updateOne({ password: await hashPassword(input.password as string) });
      return [true, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Update a status of acount
   */
  public async status(
    input: Pick<ICustomerRequest, "userId">
  ): Promise<[type: IUserType | undefined, err: string]> {
    try {
      const find = await this.user.findOne({ _id: input.userId })
      if (!find)
        return [undefined, `Aucun utilisateur trouver.`];
      const result = await this.user.findByIdAndUpdate(
        { _id: input.userId },
        { status: !find.status },
        { new: true }
      );
      return [result as IUserType, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Send otp for restore password
   */
  public async sendRestoreCode(
    input: Pick<ICustomerRequest, "email">
  ): Promise<[type: IUserType | undefined, err: string]> {
    try {
      await validateSchema(emailF, input)
      const findUser = await this.user.findOne({ email: input.email });
      if (!findUser) return [undefined, `Aucun utilisateur trouver.`];
      await this.otp.send(findUser, "renitialisation");
      return [findUser as IUserType, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Get token to restore password
   */
  public async getTokenToRestorePsswd(
    input: Pick<IOtp, "userId" | "otp">
  ): Promise<[type: string | undefined, error: string]> {
    try {
      const findOtp = await this.otp.findOtp(input);
      if (!findOtp)
        return [undefined, `Code saisi est incorrect ou déjà expirer.`];
      const user: any = await this.user.find({ _id: input.userId })
      await this.otp.delete(input.userId as string);
      return [token.createToken(user._id, user.role), ``];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
   * Restore password
   */
  public async RestorePassword(
    userId: string,
    input: Pick<ICustomerRequest, "password">
  ): Promise<[type: IUserType | undefined, err: string]> {
    try {
      const result = await this.user.findByIdAndUpdate(
        { _id: userId },
        { password: await hashPassword(input.password as string) }
      );
      if (!result) return [undefined, `Aucun utilisateur trouver.`];
      return [result as IUserType, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `${err.message}`];
    }
  }

  /**
  * Remove contry
  */
  public async remove(
    input: Pick<ICustomerRequest, "userId">
  ): Promise<[type: string | undefined, error: string]> {
    try {
      const result = await this.user.findByIdAndDelete(
        { _id: input.userId }
      );
      return result ? ["Utilisateur supprimer avec succès.", ""] : [undefined, "Aucune Utilisateur trouver"];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, "err.message"];
    }
  }
  // lolo@gamil.com::iA5l5LohyU
}
