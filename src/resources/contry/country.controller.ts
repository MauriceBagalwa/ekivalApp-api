import { Route, Res, Request, TsoaResponse, Controller, Tags, Get, Body, Query, Post, Put, Delete, Security } from "tsoa"
import { IQuery } from "../../utils/interfaces/request.interface";
import auth from "../../middleware/autorization";
import { ICountryType } from "../region/schema";
import Service from "./country.service"
import { ROLES } from '../users/user'
import * as express from "express"

@Tags("Contries")
@Route("api/admin")
export class Country extends Controller {

      private contry = new Service()
      private authMessage = "Vous ne disposez pas de droit pour effectuer cette demande."

      @Post("contries")
      @Security("Bearer", ["admin"])
      public async Create(@Body() input: Omit<ICountryType, "flag" | "countryId" | "status">,
            @Res() succes: TsoaResponse<200, { status: true; country: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.admin(request))
                  return noAuth(501, {
                        status: false, message: this.authMessage
                  })
            const result = await this.contry.registre(input)
            return result[0] ? succes(200, { status: true, country: result[0] })
                  : badRequest(400, {
                        status: false, message: ` ${result[1]} `
                  });
      }

      @Get("contries")
      public async Contries(@Query() status: boolean = true,
            @Query() offset: number = 1,
            @Query() limit: number = 100,
            @Res() succes: TsoaResponse<200, { status: true; countries: any }>,
      ): Promise<any> {
            const item: IQuery = {
                  status, offset, limit
            }
            const result = await this.contry.getAll(item)
            return succes(200, { status: true, countries: result })
      }

      @Put("contries")
      @Security("Bearer", ["admin"])
      public async Update(@Body() input: Omit<ICountryType, "flag">,
            @Res() succes: TsoaResponse<200, { status: true; country: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.admin(request))
                  return noAuth(501, {
                        status: false, message: this.authMessage
                  })
            const result = await this.contry.update(input)
            return result[0] ? succes(200, { status: true, country: result[0] })
                  : badRequest(400, {
                        status: false, message: ` ${result[1]} `
                  });
      }

      @Delete("contries")
      @Security("Bearer", ["admin"])
      public async Delete(@Body() input: Pick<ICountryType, "countryId">,
            @Res() succes: TsoaResponse<200, { status: true; message: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            if (!auth.admin(request))
                  return noAuth(501, {
                        status: false, message: this.authMessage
                  })
            const result = await this.contry.remove(input)
            return result[0] ? succes(200, { status: true, message: result[0] })
                  : badRequest(400, {
                        status: false, message: ` ${result[1]} `
                  });
      }

}