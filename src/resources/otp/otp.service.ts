import { OtpModel, IOtp } from "./otp";
import { randomCode, sendSMS } from "../../utils/stringTypes.utils";
import { IPhone } from "../users/user";
import logger from "../../utils/logger";

export type IOtpCreation = Pick<IOtp, "user">;
export type IOtpdelete = Pick<IOtp, "userId">;

export default class Otp {
  private otp = OtpModel;

  public async create(
    index: string,
    item: IOtp
  ): Promise<[type: IOtp | undefined, error: string]> {
    try {
      const otp = randomCode(6)
      let result = await this.otp.updateOne(
        { user: item.user },
        {
          otp,
          createAt: Date.now(),
        },
        { upsert: true }
      );

      sendSMS(item.phone as IPhone, `Ekival: votre code de ${index} est: ${otp}. Il expire dans 10 minutes.`)
      return [result as unknown as IOtp, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, "Une Erreur est survenu lors de l'enregistrement"];
    }
  }

  public async delete(
    userId: string
  ): Promise<[type: IOtp | undefined, error: string]> {
    try {
      let result = await this.otp.deleteOne({ user: userId });
      return [result as unknown as IOtp, ""];
    } catch (err: any) {
      logger.error(err.message);
      return [undefined, "Erreur de supprision."];
    }
  }

  public async findOtp(input: Pick<IOtp, "userId" | "otp">): Promise<any> {
    try {
      return await this.otp.findOne({ use: false, user: input.userId, otp: input.otp });
    } catch (err: any) {
      logger.error(err.message);
      return null;
    }
  }

  public async send(item: any, index: string) {
    const value: IOtp = {
      user: item._id.toString(),
      phone: item.phone,
    };
    await this.create("renitialisation", value);
  }
}
