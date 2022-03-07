import { CountryType, ICountryType } from "../region/schema";
import logger from "../../utils/logger";
import { IQuery } from "../../utils/interfaces/request.interface";

export default class Country {
      private contry = CountryType;

      /**
       * Registre a new contry
       */
      public async registre(
            input: ICountryType
      ): Promise<[type: ICountryType | undefined, error: string]> {
            try {
                  const item = new this.contry(input);
                  const saveResult = await item.save();
                  return [saveResult, ""];
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }

      /**
       * Get all contry
       */
      public async getAll(
            item: IQuery
      ): Promise<any> {
            try {
                  const { status, limit, offset } = item
                  const contries = await this.contry.find({ status })
                        .sort({ _id: -1 })
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
       * Update contry
       */
      public async update(
            input: Omit<ICountryType, "flag">
      ): Promise<[type: ICountryType | undefined, error: string]> {
            try {
                  const saveResult = await this.contry.findByIdAndUpdate(
                        { _id: input.countryId }, input,
                        { new: true }
                  );
                  return saveResult
                        ? [saveResult as ICountryType, ""]
                        : [undefined, "Aucun pays trouver"];
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }

      /**
       * Remove contry
       */
      public async remove(
            input: Pick<ICountryType, "countryId">
      ): Promise<[type: string | undefined, error: string]> {
            try {
                  const findContry = await this.contry.findOne(
                        { _id: input.countryId }
                  );
                  if (!findContry) return [undefined, "Aucun pays trouver"];
                  await findContry.deleteOne()
                  return ["Pays supprimer avec succès.", ""]
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, "err.message"];
            }
      }
}
