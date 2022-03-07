import { customerF, customerUF, userF, signinFormat, emailF } from "./user.validate";
import { validateSchema } from "../../middleware/validate.resource";
import { IUserType, UserModel, IPhone, ROLES } from "./user";
import { hashPassword } from "../../utils/stringTypes.utils";
import token from "../../utils/token";
import { RegionType } from "../region/schema";
import service from "../otp/otp.service";
import logger from "../../utils/logger";
import { IOtp } from "../otp/otp";

export interface ICustomerRequest {
  userId?: string;
  fullname: string;
  email: string;
  phone: IPhone;
  region?: string;
  password?: string;
  oldPassword?: string;
  role?: string;
  otp?: string;
}

export async function _update(_id: any, item: any) {
  console.log("valur to update:", item)
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
            `Error: la region selectionnern'est pas pris en charge.`,
          ]
        }

      const value = new this.user(formatItem);
      const saveUser = await value.save();
      return [saveUser as IUserType, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
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
            `Error: la region selectionnern'est pas pris en charge.`,
          ]
        }
      const result = await _update(userId, formateItem)
      return result ? [result as IUserType, ``] : [undefined, `Error: Aucun utilisateur trouver.`]
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
    }
  }

  /**
   * Update a phone number for user
   * on signUp
   */
  public async changePhone(
    item: Pick<ICustomerRequest, "userId" | "phone">
  ): Promise<any> {
    try {
      let value: object = {
        phone: item.phone
      }
      const result = await _update(item.userId, value)
      if (!result) return [undefined, `Error: Aucun utilisateur trouver.`];
      await this.otp.send(result, "confirmation");
      return [result, ``];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
    }
  }

  /**
  * Resend otp 
  */
  public async resendOTP(
    item: Pick<ICustomerRequest, "userId">
  ): Promise<[type: IUserType | undefined, error: string]> {
    try {
      const find = await this.user.findOne({ _id: item.userId, status: false });
      if (!find) return [undefined, `Error: Aucun utilisateur trouver.`];
      await this.otp.send(find, "confirmation");
      return [find, ``];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
    }
  }

  /**
   * Active Acount
   */
  public async activeAccount(
    item: Pick<IOtp, "userId" | "otp">
  ): Promise<[type: IUserType | undefined, error: string]> {
    try {
      let findOtp
      let result
      const findUser = await this.user.findOne({ _id: item.userId, status: false });
      if (findUser) {
        findOtp = await this.otp.findOtp(item)
        console.log(`Etat Otp: ${findOtp ? true : false}`)
        if (findOtp)
          result = await _update(item.userId, { status: true })
      }
      return (findUser && result) ? [result as IUserType, token.createToken(result._id, result.role)]
        : [undefined, `Error: Code saisi est incorrect ou déjà expirer.`]
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
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
      let user, find;
      user = await this.user.findOne({ email: item.email, status: true });
      if (user)
        find = await user.comparePassword(item.password as string);

      return (user && find) ? [user as IUserType, token.createToken(user._id, user.role)]
        : [undefined, `Error: Adresse email ou mot de passe incorrect.`];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
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
      if (!user) return [undefined, `Error: Aucun utilisateur trouver.`];
      if (!await user.comparePassword(input.oldPassword as string))
        return [undefined, `Error: Ancien mot de passe  incorrect.`];
      await user.updateOne({ password: await hashPassword(input.password as string) });
      return [true, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
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
        return [undefined, `Error: Aucun utilisateur trouver.`];
      const result = await this.user.findByIdAndUpdate(
        { _id: input.userId },
        { status: !find.status },
        { new: true }
      );
      return [result as IUserType, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
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
      if (!findUser) return [undefined, `Error: Aucun utilisateur trouver.`];
      await this.otp.send(findUser, "renitialisation");
      return [findUser as IUserType, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
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
        return [undefined, `Error: Code saisi est incorrect ou déjà expirer.`];
      const user: any = await this.user.find({ _id: input.userId })
      await this.otp.delete(input.userId as string);
      return [token.createToken(user._id, user.role), ``];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
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
      if (!result) return [undefined, `Error: Aucun utilisateur trouver.`];
      return [result as IUserType, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, `Error: ${err.message}`];
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
}
