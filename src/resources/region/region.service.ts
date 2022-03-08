import { IQuery } from "../../utils/interfaces/request.interface";
import { RegionType, IRegionType } from "./schema";
import { EtatType } from "./schema";
import logger from "../../utils/logger";

export default class RegionService {
      /**
          * Find Etat by Id
          */
      private async findEtat(_id: string) {
            return await EtatType.findById({ _id, status: true })
      }
      /**
       * Registre a new contry
       */
      public async registre(
            input: IRegionType
      ): Promise<[type: IRegionType | undefined, error: string]> {
            try {
                  console.log("input", input)
                  if (!await this.findEtat(input.etat)) return [undefined, "Aucun etat/province trouver"];
                  const item = new RegionType(input);
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
                  const contries = await RegionType.find({ status })
                        .sort({ _id: -1 })
                        .populate({ path: "etat", select: "designation contry" })
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
            input: Omit<IRegionType, "status">
      ): Promise<[type: IRegionType | undefined, error: string]> {
            try {
                  if (!await this.findEtat(input.etat)) return [undefined, "Aucun etat trouver"];
                  const saveResult = await RegionType.findByIdAndUpdate(
                        { _id: input.regionId }, input,
                        { new: true }
                  );
                  return saveResult
                        ? [saveResult as IRegionType, ""]
                        : [undefined, "Aucune region trouver"];
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }

      /**
       * Remove contry
       */
      public async remove(
            input: Pick<IRegionType, "regionId">
      ): Promise<[type: string | undefined, error: string]> {
            try {
                  const result = await RegionType.findByIdAndDelete(
                        { _id: input.regionId }
                  );
                  return result ? ["Region supprimer avec succès.", ""] : [undefined, "Aucune Region trouver"];
            } catch (err: any) {
                  logger.error(err.message);
                  return [undefined, err.message];
            }
      }
}
