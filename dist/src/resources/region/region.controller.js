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
exports.Region = void 0;
const tsoa_1 = require("tsoa");
const autorization_1 = __importDefault(require("../../middleware/autorization"));
const region_service_1 = __importDefault(require("./region.service"));
const user_1 = require("../users/user");
let Region = class Region extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.region = new region_service_1.default();
    }
    Create(input, succes, badRequest, noAuth, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!autorization_1.default.role(request, user_1.ROLES.ADMIN))
                return noAuth(501, {
                    status: false, message: "Vous ne disposez pas de " +
                        "droit pour effectuer cette demande."
                });
            const result = yield this.region.registre(input);
            return result[0] ? succes(200, { status: true, city: result[0] })
                : badRequest(400, {
                    status: false, message: `Error: ${result[1]} `
                });
        });
    }
    etats(status = true, offset = 1, limit = 100, succes) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = {
                status, offset, limit
            };
            const result = yield this.region.getAll(item);
            return succes(200, { status: true, city: result });
        });
    }
    Update(input, succes, badRequest, noAuth, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!autorization_1.default.role(request, user_1.ROLES.ADMIN))
                return noAuth(501, {
                    status: false, message: "Vous ne disposez pas de " +
                        "droit pour effectuer cette demande."
                });
            const result = yield this.region.update(input);
            return result[0] ? succes(200, { status: true, city: result[0] })
                : badRequest(400, {
                    status: false, message: `Error: ${result[1]} `
                });
        });
    }
    Delete(input, succes, badRequest, noAuth, request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!autorization_1.default.role(request, user_1.ROLES.ADMIN))
                return noAuth(501, {
                    status: false, message: "Vous ne disposez pas de " +
                        "droit pour effectuer cette demande."
                });
            const result = yield this.region.remove(input);
            return result[0] ? succes(200, { status: true, message: result[0] })
                : badRequest(400, {
                    status: false, message: `Error: ${result[1]} `
                });
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("regions"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __param(4, (0, tsoa_1.Request)())
], Region.prototype, "Create", null);
__decorate([
    (0, tsoa_1.Get)("regions"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Res)())
], Region.prototype, "etats", null);
__decorate([
    (0, tsoa_1.Put)("regions"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __param(4, (0, tsoa_1.Request)())
], Region.prototype, "Update", null);
__decorate([
    (0, tsoa_1.Delete)("regions"),
    (0, tsoa_1.Security)("Bearer", ["admin"]),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __param(4, (0, tsoa_1.Request)())
], Region.prototype, "Delete", null);
Region = __decorate([
    (0, tsoa_1.Tags)("Region"),
    (0, tsoa_1.Route)("api/admin")
], Region);
exports.Region = Region;
