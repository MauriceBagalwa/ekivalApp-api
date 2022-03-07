import { Route, Tags, Res, Controller, Request, Security, Get, Post, Put, Body, Delete, Query, TsoaResponse } from "tsoa";
import Service, { ICustomerRequest } from "./users.service";
import auth from "../../middleware/autorization";
import { ROLES } from '../users/user';
import * as express from 'express';
import { IOtp } from "../otp/otp";

@Route("api")
@Tags("Users")
export class Users extends Controller {

  private user = new Service();

  @Post("customer/siginup")
  public async createCustomer(
    @Body() item: Omit<ICustomerRequest, "userId" | "role" | "otp" | "oldPassword">,
    @Res() success: TsoaResponse<200, { status: true, user: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
  ): Promise<any> {
    let result = await this.user.registre(item)
    return result[0] ? success(200, { status: true, user: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Post("admin/users/siginup")
  public async createUsers(
    @Body() item: Omit<ICustomerRequest, "userId" | "region" | "otp" | "password" | "oldPassword">,
    @Res() success: TsoaResponse<200, { status: true, user: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
  ): Promise<any> {
    let result = await this.user.registre(item)
    return result[0] ? success(200, { status: true, user: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Put("users")
  @Security("Bearer", ["admin"])
  public async update(
    @Body() item: Omit<ICustomerRequest, "password" | "role" | "oldPassword" | "userId" | "otp">,
    @Res() success: TsoaResponse<200, { status: true, user: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
    @Request() request: express.Request
  ): Promise<any> {
    let result = await this.user.update(auth.user(request), item)
    return result[0] ? success(200, { status: true, user: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Put("users/change/phonenumber")
  public async changePhoneNunber(
    @Body() item: Pick<ICustomerRequest, "userId" | "phone">,
    @Res() success: TsoaResponse<200, { status: true, user: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
    @Request() request: express.Request
  ): Promise<any> {
    let result = await this.user.changePhone(item)
    return result[0] ? success(200, { status: true, user: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Post("users/resend/otp")
  public async resendOTP(
    @Body() item: Pick<ICustomerRequest, "userId">,
    @Res() success: TsoaResponse<200, { status: true, user: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
  ): Promise<any> {
    let result = await this.user.resendOTP(item)
    return result[0] ? success(200, { status: true, user: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Post("users/account/active")
  public async activeAcount(
    @Body() item: Pick<IOtp, "userId" | "otp">,
    @Res() success: TsoaResponse<200, { status: true, user: any, token: string }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
  ): Promise<any> {
    let result = await this.user.activeAccount(item)
    return result[0] ? success(200, { status: true, user: result[0], token: result[1] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Post("users/signin")
  public async signIn(
    @Body() item: Pick<ICustomerRequest, "email" | "password">,
    @Res() success: TsoaResponse<200, { status: true, user: any, token: string }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
  ): Promise<any> {
    let result = await this.user.login(item)
    return result[0] ? success(200, { status: true, user: result[0], token: result[1] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Post("users/changePassword")
  @Security("Bearer", ["admin"])
  public async changePassword(
    @Body() input: Pick<ICustomerRequest, "password" | "oldPassword">,
    @Res() success: TsoaResponse<200, { status: true, user: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
    @Request() request: express.Request
  ): Promise<any> {
    let result = await this.user.changePassword(auth.user(request), input)
    return result[0] ? success(200, { status: true, user: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Put("admin/users/status")
  @Security("Bearer", ["admin"])
  public async acountStatus(
    @Body() input: Pick<ICustomerRequest, "userId">,
    @Res() success: TsoaResponse<200, { status: true, user: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
    @Res() authorization: TsoaResponse<501, { status: false; message: string }>,
    @Request() request: express.Request
  ): Promise<any> {
    if (!auth.role(request, ROLES.ADMIN))
      return authorization(501, {
        status: false, message: "Vous ne disposez pas de " +
          "droit pour effectuer cette demande."
      })
    let result = await this.user.status(input)
    return result[0] ? success(200, { status: true, user: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Post("users/restore/code")
  public async getrestoreCode(
    @Body() input: Pick<ICustomerRequest, "email">,
    @Res() success: TsoaResponse<200, { status: true, user: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
  ): Promise<any> {
    let result = await this.user.sendRestoreCode(input)
    return result[0] ? success(200, { status: true, user: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Post("users/restore/verfycode")
  public async getToken(
    @Body() input: Pick<IOtp, "userId" | "otp">,
    @Res() success: TsoaResponse<200, { status: true, token: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
  ): Promise<any> {
    let result = await this.user.getTokenToRestorePsswd(input)
    return result[0] ? success(200, { status: true, token: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }


  @Post("users/restore/password")
  @Security("Bearer", ["admin"])
  public async restorePsswd(
    @Body() input: Pick<ICustomerRequest, "password">,
    @Res() success: TsoaResponse<200, { status: true, token: any }>,
    @Res() badRequest: TsoaResponse<400, { status: false, message: string }>,
    @Request() request: express.Request
  ): Promise<any> {
    let result = await this.user.RestorePassword(auth.user(request), input)
    return result[0] ? success(200, { status: true, token: result[0] })
      : badRequest(400, { status: false, message: result[1] })
  }

  @Get("/admin/users")
  @Security("Bearer", ["admin"])
  public async getUsers(
    @Query() status: boolean = true,
    @Query() offset: number = 1,
    @Query() limit: number = 100,
    @Res() success: TsoaResponse<200, { status: true, users: any }>,
    @Res() authorization: TsoaResponse<501, { status: false; message: string }>,
    @Request() request: express.Request
  ): Promise<any> {
    if (!auth.role(request, ROLES.ADMIN))
      return authorization(501, {
        status: false, message: "Vous ne disposez pas de " +
          "droit pour effectuer cette demande."
      })
    let result = await this.user.getAll(status, offset, limit, false);
    return success(200, { status: true, users: result });
  }

  @Get("/customer/users")
  @Security("Bearer", ["admin"])
  public async getCustomer(
    @Query() status: boolean = true,
    @Query() offset: number = 1,
    @Query() limit: number = 100,
    @Res() success: TsoaResponse<200, { status: true, users: any }>
  ): Promise<any> {
    let result = await this.user.getAll(status, offset, limit, true);
    return success(200, { status: true, users: result });
  }

  @Delete("users")
  @Security("Bearer", ["admin"])
  public async Delete(@Body() input: Pick<ICustomerRequest, "userId">,
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
    const result = await this.user.remove(input)
    return result[0] ? succes(200, { status: true, message: result[0] })
      : badRequest(400, {
        status: false, message: `Error: ${result[1]} `
      });
  }

}
