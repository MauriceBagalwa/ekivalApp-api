
import fs from "fs-extra";
import { _update } from "../users/users.service";

export async function checkDirectoryOrCreate(path: string): Promise<[isCreated: boolean, error: string]> {
      try {
            await fs.ensureDir(path)
            return [true, ""];
      }
      catch (error) {
            console.log(error);
            return [false, "Une erreur est survenue lors de la verification du dossier"]
      }
}

export async function uploadImage(folderName: string, file: Express.Multer.File): Promise<[fileUrl: string, error: string]> {
      const folder = `public/uploads/${folderName}`;
      try {
            const [isCreated, error] = await checkDirectoryOrCreate(folder);
            if (isCreated) {

                  const destinationPath = `${folder}/ekival-${Date.now()}`;
                  await fs.outputFile(destinationPath, file.buffer);
                  let extArray = file.mimetype.split("/");
                  let ext = extArray[extArray.length - 1];

                  if (ext != "png" && ext != "jpg" && ext != "png")
                        return ["", "Format du fichier non pris en charge."];

                  // let extension = extArray[extArray.length - 1];

                  // console.log(file)
                  // console.log("Extention:", extension)
                  return [destinationPath, ""];
            }
            return ["", error];
      } catch (error) {
            console.log(error);
            return ["", "Une erreur est survenue lors du deplacement du fichier"];
      }
}

export async function profile(file: Express.Multer.File): Promise<[fileUrl: boolean, error: string]> {
      const folder = `public/uploads/images`;
      try {
            const [isCreated, error] = await checkDirectoryOrCreate(folder);
            if (isCreated) {

                  let extArray = file.mimetype.split("/");
                  let ext = extArray[extArray.length - 1];

                  if (ext != "png" && ext != "jpg" && ext != "png" && ext != 'jpeg')
                        return [false, "Format du fichier non pris en charge."];
                        
                  const destinationPath = `${folder}/ekvl${Date.now()}.${ext}`;
                  await fs.outputFile(destinationPath, file.buffer);
                  console.log("designation:", destinationPath)
                  return [true, `${destinationPath.replace(`public/`, "")}`];
            }
            return [false, error];
      } catch (error) {
            console.log(error);
            return [false, "Une erreur est survenue lors du deplacement du fichier"];
      }
}