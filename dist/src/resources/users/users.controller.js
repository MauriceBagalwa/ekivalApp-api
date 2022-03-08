"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const tsoa_1 = require("tsoa");
const users_service_1 = __importDefault(require("./users.service"));
const autorization_1 = __importDefault(require("../../middleware/autorization"));
var TypeUser;
(function (TypeUser) {
    TypeUser["system"] = "system";
    TypeUser["customer"] = "customer";
})(TypeUser || (TypeUser = {}));
const authMessage = "Vous ne disposez pas de droit pour effectuer cette demande.";
let Users = class Users extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.user = new users_service_1.default();
    }
    createCustomer(item, success, badRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.registre(item);
            return result[0] ? success(200, { status: true, user: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    createUsers(item, success, badRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.registre(item);
            return result[0] ? success(200, { status: true, user: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    update(item, success, badRequest, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.update(autorization_1.default.user(request), item);
            return result[0] ? success(200, { status: true, user: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    changePhoneNunber(item, success, badRequest, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.changePhone(item);
            return result[0] ? success(200, { status: true, user: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    resendOTP(item, success, badRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.resendOTP(item);
            return result[0] ? success(200, { status: true, user: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    activeAcount(item, success, badRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.activeAccount(item);
            return result[0] ? success(200, { status: true, user: result[0], token: result[1] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    signIn(item, success, badRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.login(item);
            return result[0] ? success(200, { status: true, user: result[0], token: result[1] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    changePassword(input, success, badRequest, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.changePassword(autorization_1.default.user(request), input);
            return result[0] ? success(201, { status: true, user: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    uploadImage(file, badRequest, successResponse, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadResult = yield this.user.profile(autorization_1.default.user(request), file);
            if (uploadResult[0])
                return successResponse(201, { message: uploadResult[1] });
            return badRequest(400, { message: uploadResult[1] });
        });
    }
    acountStatus(input, success, badRequest, authorization, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!autorization_1.default.admin(request))
                return authorization(501, {
                    status: false, message: authMessage
                });
            let result = yield this.user.status(input);
            return result[0] ? success(201, { status: true, user: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    getrestoreCode(input, success, badRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.sendRestoreCode(input);
            return result[0] ? success(201, { status: true, user: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    getToken(input, success, badRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.getTokenToRestorePsswd(input);
            return result[0] ? success(201, { status: true, token: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    restorePsswd(input, success, badRequest, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.user.RestorePassword(autorization_1.default.user(request), input);
            return result[0] ? success(200, { status: true, token: result[0] })
                : badRequest(400, { status: false, message: result[1] });
        });
    }
    // @Get("/admin/users")
    // @Security("Bearer", ["admin"])
    // public async getUsers(
    //   @Query() status: boolean = true,
    //   @Query() offset: number = 1,
    //   @Query() limit: number = 100,
    //   @Res() success: TsoaResponse<200, { status: true, users: any }>,
    //   @Res() authorization: TsoaResponse<501, { status: false; message: string }>,
    //   @Request() request: express.Request
    // ): Promise<any> {
    //   if (!auth.admin(request))
    //     return authorization(501, {
    //       status: false, message: authMessage
    //     })
    //   let result = await this.user.getAll(status, offset, limit, false);
    //   return success(200, { status: true, users: result });
    // }
    getCustomer(type, status = true, offset = 1, limit = 100, success, noAuth, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!autorization_1.default.allUserSystem(request))
                return noAuth(501, {
                    status: false, message: authMessage
                });
            if (type == TypeUser.system && !autorization_1.default.admin(request))
                return noAuth(501, {
                    status: false, message: authMessage
                });
            let result = yield this.user.getAll(status, offset, limit, true);
            return success(200, { status: true, users: result });
        });
    }
    Delete(input, succes, badRequest, noAuth, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!autorization_1.default.admin(request))
                return noAuth(501, {
                    status: false, message: authMessage
                });
            const result = yield this.user.remove(input);
            return result[0] ? succes(200, { status: true, message: result[0] })
                : badRequest(400, {
                    status: false, message: `Error: ${result[1]} `
                });
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("customer/siginup"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)())
], Users.prototype, "createCustomer", null);
__decorate([
    (0, tsoa_1.Post)("admin/users/siginup"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)())
], Users.prototype, "createUsers", null);
__decorate([
    (0, tsoa_1.Put)("users"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Request)())
], Users.prototype, "update", null);
__decorate([
    (0, tsoa_1.Put)("users/change/phonenumber"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Request)())
], Users.prototype, "changePhoneNunber", null);
__decorate([
    (0, tsoa_1.Post)("users/resend/otp"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)())
], Users.prototype, "resendOTP", null);
__decorate([
    (0, tsoa_1.Post)("users/account/active"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)())
], Users.prototype, "activeAcount", null);
__decorate([
    (0, tsoa_1.Post)("users/signin"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)())
], Users.prototype, "signIn", null);
__decorate([
    (0, tsoa_1.Post)("users/changePassword"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Request)())
], Users.prototype, "changePassword", null);
__decorate([
    (0, tsoa_1.Put)("users/profile"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.UploadedFile)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Request)())
], Users.prototype, "uploadImage", null);
__decorate([
    (0, tsoa_1.Put)("admin/users/status"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __param(4, (0, tsoa_1.Request)())
], Users.prototype, "acountStatus", null);
__decorate([
    (0, tsoa_1.Post)("users/restore/code"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)())
], Users.prototype, "getrestoreCode", null);
__decorate([
    (0, tsoa_1.Post)("users/restore/verfycode"),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)())
], Users.prototype, "getToken", null);
__decorate([
    (0, tsoa_1.Post)("users/restore/password"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Request)())
], Users.prototype, "restorePsswd", null);
__decorate([
    (0, tsoa_1.Get)("admin/users"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Res)()),
    __param(5, (0, tsoa_1.Res)()),
    __param(6, (0, tsoa_1.Request)())
], Users.prototype, "getCustomer", null);
__decorate([
    (0, tsoa_1.Delete)("users"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __param(4, (0, tsoa_1.Request)())
], Users.prototype, "Delete", null);
Users = __decorate([
    (0, tsoa_1.Route)("api"),
    (0, tsoa_1.Tags)("Users")
], Users);
exports.Users = Users;
