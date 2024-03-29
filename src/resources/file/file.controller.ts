import { Post, Route, FormField, Res, Request, TsoaResponse, Tags, UploadedFile, Controller } from "tsoa";
import * as fileService from "./file.service";
import * as express from "express";

@Route("api/admin/files")
@Tags("Fichiers")
export class FilesController extends Controller {
      @Post("image")
      public async uploadImage(@FormField("folder") folderName: string, @UploadedFile() file: Express.Multer.File,
            @Res() badRequest: TsoaResponse<400, { message: string }>,
            @Res() successResponse: TsoaResponse<201, { fileUrl: string }>
      ): Promise<any> {
            const uploadResult = await fileService.uploadImage(folderName, file);
            if (uploadResult[0])
                  return successResponse(201, { fileUrl: `${uploadResult[0].replace("public/", "")}` });
            return badRequest(400, { message: uploadResult[1] });
      }
}