
import fs from "fs-extra";

const MIME_TYPES: object = {
      "image/jpg": "jpg",
      "image/jpeg": "jpg",
      "image/png": "png",
      "application/pdf": "pdf",
};

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
                  let extension = extArray[extArray.length - 1];
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