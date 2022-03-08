import { Route, Res, Request, TsoaResponse, Controller, Tags, Get, Body, Query, Post, Put, Delete, Security } from "tsoa"
import { IQuery } from "../../utils/interfaces/request.interface";
import auth from "../../middleware/autorization";
import { IEtatType } from "../region/schema";
import Service from "./etat.service"
import * as express from "express"

@Tags("Etats")
@Route("api/admin")
export class Etat extends Controller {

      private etat = new Service()

      @Post("etats")
      @Security("Bearer", ["admin"])
      public async Create(@Body() input: Omit<IEtatType, "etatId" | "status">,
            @Res() succes: TsoaResponse<200, { status: true; etat: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.admin(request))
                  return noAuth(501, {
                        status: false, message: "Vous ne disposez pas de " +
                              "droit pour effectuer cette demande."
                  })
            const result = await this.etat.registre(input)
            return result[0] ? succes(200, { status: true, etat: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }

      @Get("etats")
      @Security("Bearer", ["admin"])
      public async etats(@Query() status: boolean = true,
            @Query() offset: number = 1,
            @Query() limit: number = 100,
            @Res() succes: TsoaResponse<200, { status: true; etats: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>
      ): Promise<any> {
            const item: IQuery = {
                  status, offset, limit
            }
            const result = await this.etat.getAll(item)
            return succes(200, { status: true, etats: result })

      }

      @Put("etats")
      @Security("Bearer", ["admin"])
      public async Update(@Body() input: Omit<IEtatType, "status">,
            @Res() succes: TsoaResponse<200, { status: true; etat: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.admin(request))
                  return noAuth(501, {
                        status: false, message: "Vous ne disposez pas de " +
                              "droit pour effectuer cette demande."
                  })
            const result = await this.etat.update(input)
            return result[0] ? succes(200, { status: true, etat: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }

      @Delete("etats")
      @Security("Bearer", ["admin"])
      public async Delete(@Body() input: Pick<IEtatType, "etatId">,
            @Res() succes: TsoaResponse<200, { status: true; message: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.admin(request))
                  return noAuth(501, {
                        status: false, message: "Vous ne disposez pas de " +
                              "droit pour effectuer cette demande."
                  })
            const result = await this.etat.remove(input)
            return result[0] ? succes(200, { status: true, message: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }

}