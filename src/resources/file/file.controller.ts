import { Post, Route, FormField, Res, TsoaResponse, Security, Tags, UploadedFile, Controller } from "tsoa";
import * as fileService from "./file.service";

@Route("api/admin/files")
// @Security("Bearer", ["admin"] auth admin
@Tags("Fichiers")
export class FilesController extends Controller {
      @Post("image")
      public async uploadImage(@FormField("folder") folderName: string, @UploadedFile() file: Express.Multer.File,
            @Res() badRequest: TsoaResponse<400, { message: string }>,
            @Res() successResponse: TsoaResponse<201, { fileUrl: string }>): Promise<any> {
            const uploadResult = await fileService.uploadImage(folderName, file);
            if (uploadResult[0])
                  return successResponse(201, { fileUrl: `${uploadResult[0].replace("public/", "")}` });
            return badRequest(400, { message: uploadResult[1] });
      }
}