import { Route, Tags, Res, Controller, Request, Security, Get, Post, Put, Body, Delete, Query, TsoaResponse } from "tsoa";
import Service from "./wallet.service";
import { IWalletType } from "./wallet";
import auth from "../../middleware/autorization";
import * as express from 'express';

@Tags("Wallet")
@Route("api/admin")
export class Wallet extends Controller {

      private wallet = new Service()

      @Post("wallets")
      @Security("Bearer", ["admin"])
      public async Create(@Body() input: Omit<IWalletType, "user"|"walletId">,
            @Res() succes: TsoaResponse<200, { status: true; wallet: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            const result = await this.wallet.registre(auth.user(request), input)
            return result[0] ? succes(200, { status: true, wallet: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }

      @Get("wallets")
      @Security("Bearer", ["admin"])
      public async getWallets(
            @Res() succes: TsoaResponse<200, { status: true; wallet: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            const result = await this.wallet.getAll(auth.user(request))
            return result[0] ? succes(200, { status: true, wallet: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }

      @Put("wallets")
      @Security("Bearer", ["admin"])
      public async Update(@Body() input: Omit<IWalletType, "user">,
            @Res() succes: TsoaResponse<200, { status: true; wallet: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {

            const result = await this.wallet.update(auth.user(request), input)
            return result[0] ? succes(200, { status: true, wallet: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }

      @Delete("wallets")
      @Security("Bearer", ["admin"])
      public async Delete(@Body() input: Pick<IWalletType, "walletId">,
            @Res() succes: TsoaResponse<200, { status: true; message: any }>,
            @Res() badRequest: TsoaResponse<400, { status: false; message: string }>,
            @Res() noAuth: TsoaResponse<501, { status: false; message: string }>,
            @Request() request: express.Request
      ): Promise<any> {
            const result = await this.wallet.remove(auth.user(request), input)
            return result[0] ? succes(200, { status: true, message: result[0] })
                  : badRequest(400, {
                        status: false, message: `Error: ${result[1]} `
                  });
      }
}
