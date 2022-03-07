import { IEtatType, EtatType, CountryType } from '../region/schema'
import { IQuery } from "../../utils/interfaces/request.interface";
import logger from "../../utils/logger";

export default class Etat {
      private etat = EtatType
      private country = CountryType

      /**
      * Find contry by Id
      */
      private async contryFind(_id: string) {
            return await this.country.findById({ _id, status: true })
      }

      /**
       * Registre a new etat
       */
      public async registre(
            input: IEtatType
      ): Promise<[type: IEtatType | undefined, error: string]> {
            try {
                  if (!await this.contryFind(input.country)) return [undefined, "Aucun pays trouver"];
                  const item = new this.etat(input);
                  const saveResult = await item.save();
                  return [saveResult, ""];
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }

      /**
       * Get all etat
       */
      public async getAll(
            item: IQuery
      ): Promise<any> {
            try {
                  const { status, limit, offset } = item
                  const contries = await this.etat.find({ status })
                        .sort({ _id: -1 })
                        .populate({ path: "country", select: "designation" })
                        .limit(limit * 1)
                        .skip(((offset <= 0 ? 1 : offset) - 1) * limit)
                        .exec();
                  return contries;
            } catch (err: any) {
                  logger.error(err.message);
                  throw new Error(err.message);
            }
      }

      /**
       * Update etat
       */
      public async update(
            input: IEtatType
      ): Promise<[type: IEtatType | undefined, error: string]> {
            try {
                  if (!this.contryFind(input.country)) return [undefined, "Aucun pays trouver"];
                  const saveResult = await this.etat.findByIdAndUpdate(
                        { _id: input.etatId }, input,
                        { new: true }
                  );
                  return saveResult
                        ? [saveResult as IEtatType, ""]
                        : [undefined, "Aucun etat trouver"];
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }

      /**
       * Remove etat
       */
      public async remove(
            input: Pick<IEtatType, "etatId">
      ): Promise<[type: string | undefined, error: string]> {
            try {
                  const findetat = await this.etat.findOne(
                        { _id: input.etatId }
                  );
                  if (!findetat) return [undefined, "Aucun pays trouver"];
                  await findetat.deleteOne()
                  return ["Etat supprimer avec succès.", ""]
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, "err.message"];
            }
      }
}