import { IWalletType, WalletType } from "./wallet";
import { UserModel } from "../users/user";
import logger from "../../utils/logger";

export default class Wallet {
      private wallet = WalletType;
      private user = UserModel;

      /**
       * Registre a wallet
       */

      /**
       * Find Etat by Id
       */
      private async findUser(_id: string) {
            return await this.user.findById({ _id, status: true });
      }

      private async findWallet(filter: object, index: number) {
            return [
                  await this.wallet.findOne(filter),
                  index == 0
                        ? "Designation ou adresse déjà utiliser"
                        : "Aucun wallet trouver.",
            ];
      }

      /**
       * Registre a new contry
       */
      public async registre(
            userId: string,
            input: IWalletType
      ): Promise<[type: IWalletType | undefined, error: string]> {
            try {
                  if (!(await this.findUser(input.user as string)))
                        return [undefined, "Aucun utilisateur trouver"];
                  const { designation, adresse } = input;
                  const result = await this.findWallet(
                        { user: userId, designation, adresse },
                        0
                  );

                  if (result[0]) return [undefined, result[1]];
                  input.user = userId;

                  const item = new this.wallet(input);
                  const saveResult = await item.save();
                  return [saveResult, ""];
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }

      /**
       * Get all wallet for user x
       */
      public async getAll(userId: string): Promise<any> {
            try {
                  const wallets = await this.wallet
                        .find({ user: userId })
                        .sort({ _id: -1 })
                        .select("-user")
                        .exec();
                  return wallets;
            } catch (err: any) {
                  logger.error(err.message);
                  throw new Error(err.message);
            }
      }

      /**
       * Update contry
       */
      public async update(
            userId: string,
            input: IWalletType
      ): Promise<[type: IWalletType | undefined, error: string]> {
            try {

                  const { walletId, designation, adresse } = input;
                  const isUsed = await this.findWallet(
                        { user: userId, designation, adresse, _id: { $ne: { _id: walletId } } },
                        0);

                  if (isUsed[0]) return [undefined, isUsed[1]];
                  const saveResult = await this.wallet.findByIdAndUpdate(
                        { _id: walletId },
                        { designation, adresse },
                        { new: true }
                  );

                  return saveResult
                        ? [saveResult as IWalletType, ""]
                        : [undefined, "Aucun wallet trouver"];

            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }

      /**
       * Remove contry
       */
      public async remove(
            userId: string,
            input: Pick<IWalletType, "walletId">
      ): Promise<[type: string | undefined, error: string]> {
            try {
                  const result = await this.wallet.findByIdAndDelete({
                        _id: input.walletId,
                        user: userId
                  });
                  return result
                        ? ["wallet supprimer avec succès.", ""]
                        : [undefined, "Aucun wallet trouver"];
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }
}
