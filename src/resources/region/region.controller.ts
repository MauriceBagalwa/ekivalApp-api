import { Route, Tags, Res, Controller, Get, Post, Put, Body, Request, Delete, TsoaResponse, Query, Security } from "tsoa";
import { IQuery } from "../../utils/interfaces/request.interface";
import auth from "../../middleware/autorization";
import { IRegionType } from "./schema";
import Service from "./region.service";
import { ROLES } from '../users/user'
import * as express from 'express'

@Tags("Region")
@Route("api/admin")
export class Region extends Controller {

      private region = new Service()

      @Post("regions")
      @Security("Bearer", ["admin"])
      public async Create(@Body() input: Omit<IRegionType, "regionId" | "status">,
            @Res() succes: TsoaResponse<200, { status: true; city: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.role(request, ROLES.ADMIN))
                  return noAuth(501, {
                        status: false, message: "Vous ne disposez pas de " +
                              "droit pour effectuer cette demande."
                  })
            const result = await this.region.registre(input)
            return result[0] ? succes(200, { status: true, city: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }

      @Get("regions")
      @Security("Bearer", ["admin"])
      public async etats(@Query() status: boolean = true,
            @Query() offset: number = 1,
            @Query() limit: number = 100,
            @Res() succes: TsoaResponse<200, { status: true; city: any }>,
      ): Promise<any> {
            const item: IQuery = {
                  status, offset, limit
            }
            const result = await this.region.getAll(item)
            return succes(200, { status: true, city: result })
      }

      @Put("regions")
      @Security("Bearer", ["admin"])
      public async Update(@Body() input: Omit<IRegionType, "status">,
            @Res() succes: TsoaResponse<200, { status: true; city: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.role(request, ROLES.ADMIN))
                  return noAuth(501, {
                        status: false, message: "Vous ne disposez pas de " +
                              "droit pour effectuer cette demande."
                  })
            const result = await this.region.update(input)
            return result[0] ? succes(200, { status: true, city: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }

      @Delete("regions")
      @Security("Bearer", ["admin"])
      public async Delete(@Body() input: Pick<IRegionType, "regionId">,
            @Res() succes: TsoaResponse<200, { status: true; message: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.role(request, ROLES.ADMIN))
                  return noAuth(501, {
                        status: false, message: "Vous ne disposez pas de " +
                              "droit pour effectuer cette demande."
                  })
            const result = await this.region.remove(input)
            return result[0] ? succes(200, { status: true, message: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }
}
