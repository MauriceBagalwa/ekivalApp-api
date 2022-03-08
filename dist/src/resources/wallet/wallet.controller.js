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
exports.Wallet = void 0;
const tsoa_1 = require("tsoa");
const wallet_service_1 = __importDefault(require("./wallet.service"));
const autorization_1 = __importDefault(require("../../middleware/autorization"));
let Wallet = class Wallet extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.wallet = new wallet_service_1.default();
    }
    Create(input, succes, badRequest, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.wallet.registre(autorization_1.default.user(request), input);
            return result[0] ? succes(200, { status: true, wallet: result[0] })
                : badRequest(400, {
                    status: false, message: `${result[1]} `
                });
        });
    }
    getWallets(succes, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.wallet.getAll(autorization_1.default.user(request));
            return succes(200, { status: true, wallet: result });
        });
    }
    Update(input, succes, badRequest, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.wallet.update(autorization_1.default.user(request), input);
            return result[0] ? succes(200, { status: true, wallet: result[0] })
                : badRequest(400, {
                    status: false, message: `${result[1]} `
                });
        });
    }
    Delete(input, succes, badRequest, noAuth, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.wallet.remove(autorization_1.default.user(request), input);
            return result[0] ? succes(200, { status: true, message: result[0] })
                : badRequest(400, {
                    status: false, message: `${result[1]} `
                });
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("wallets"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Request)())
], Wallet.prototype, "Create", null);
__decorate([
    (0, tsoa_1.Get)("wallets"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Request)())
], Wallet.prototype, "getWallets", null);
__decorate([
    (0, tsoa_1.Put)("wallets"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Request)())
], Wallet.prototype, "Update", null);
__decorate([
    (0, tsoa_1.Delete)("wallets"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __param(4, (0, tsoa_1.Request)())
], Wallet.prototype, "Delete", null);
Wallet = __decorate([
    (0, tsoa_1.Tags)("Wallet"),
    (0, tsoa_1.Route)("api/admin")
], Wallet);
exports.Wallet = Wallet;
