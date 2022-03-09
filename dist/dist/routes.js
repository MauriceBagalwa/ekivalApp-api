"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const country_controller_1 = require("./../src/resources/contry/country.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const etat_controller_1 = require("./../src/resources/etats/etat.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const region_controller_1 = require("./../src/resources/region/region.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const users_controller_1 = require("./../src/resources/users/users.controller");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const wallet_controller_1 = require("./../src/resources/wallet/wallet.controller");
const authentication_1 = require("./../src/middleware/authentication");
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
const multer = require('multer');
const upload = multer();
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "Pick_ICountryType.Exclude_keyofICountryType.flag-or-countryId-or-status__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "index": { "dataType": "string", "required": true }, "countrycode": { "dataType": "string", "required": true }, "designation": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ICountryType.flag-or-countryId-or-status_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_ICountryType.Exclude_keyofICountryType.flag-or-countryId-or-status__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICountryType.Exclude_keyofICountryType.flag__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "countryId": { "dataType": "string" }, "status": { "dataType": "boolean" }, "index": { "dataType": "string", "required": true }, "countrycode": { "dataType": "string", "required": true }, "designation": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ICountryType.flag_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_ICountryType.Exclude_keyofICountryType.flag__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICountryType.countryId_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "countryId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IEtatType.Exclude_keyofIEtatType.etatId-or-status__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "designation": { "dataType": "string", "required": true }, "country": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IEtatType.etatId-or-status_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_IEtatType.Exclude_keyofIEtatType.etatId-or-status__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IEtatType.Exclude_keyofIEtatType.status__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "designation": { "dataType": "string", "required": true }, "etatId": { "dataType": "string" }, "country": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IEtatType.status_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_IEtatType.Exclude_keyofIEtatType.status__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IEtatType.etatId_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "etatId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IRegionType.Exclude_keyofIRegionType.regionId-or-status__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "designation": { "dataType": "string", "required": true }, "etat": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IRegionType.regionId-or-status_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_IRegionType.Exclude_keyofIRegionType.regionId-or-status__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IRegionType.Exclude_keyofIRegionType.status__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "designation": { "dataType": "string", "required": true }, "regionId": { "dataType": "string" }, "etat": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IRegionType.status_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_IRegionType.Exclude_keyofIRegionType.status__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IRegionType.regionId_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "regionId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPhone": {
        "dataType": "refObject",
        "properties": {
            "countrycode": { "dataType": "string", "required": true },
            "number": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICustomerRequest.Exclude_keyofICustomerRequest.userId-or-role-or-otp-or-oldPassword__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "fullname": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "phone": { "ref": "IPhone", "required": true }, "region": { "dataType": "string" }, "password": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ICustomerRequest.userId-or-role-or-otp-or-oldPassword_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_ICustomerRequest.Exclude_keyofICustomerRequest.userId-or-role-or-otp-or-oldPassword__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICustomerRequest.Exclude_keyofICustomerRequest.userId-or-region-or-otp-or-password-or-oldPassword__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "role": { "dataType": "string" }, "fullname": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "phone": { "ref": "IPhone", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ICustomerRequest.userId-or-region-or-otp-or-password-or-oldPassword_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_ICustomerRequest.Exclude_keyofICustomerRequest.userId-or-region-or-otp-or-password-or-oldPassword__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICustomerRequest.Exclude_keyofICustomerRequest.password-or-role-or-oldPassword-or-userId-or-otp__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "fullname": { "dataType": "string", "required": true }, "email": { "dataType": "string", "required": true }, "phone": { "ref": "IPhone", "required": true }, "region": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ICustomerRequest.password-or-role-or-oldPassword-or-userId-or-otp_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_ICustomerRequest.Exclude_keyofICustomerRequest.password-or-role-or-oldPassword-or-userId-or-otp__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICustomerRequest.userId-or-phone_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "string" }, "phone": { "ref": "IPhone", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICustomerRequest.userId_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IOtp.userId-or-otp_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "userId": { "dataType": "string" }, "otp": { "dataType": "double" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICustomerRequest.email-or-password_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "email": { "dataType": "string", "required": true }, "password": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ICustomerRequest.password-or-oldPassword_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "oldPassword": { "dataType": "string" }, "password": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TypeUser": {
        "dataType": "refEnum",
        "enums": ["system", "customer"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IWalletType.Exclude_keyofIWalletType.user-or-walletId__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "designation": { "dataType": "string", "required": true }, "adresse": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IWalletType.user-or-walletId_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_IWalletType.Exclude_keyofIWalletType.user-or-walletId__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IWalletType.Exclude_keyofIWalletType.user__": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "designation": { "dataType": "string", "required": true }, "walletId": { "dataType": "string" }, "adresse": { "dataType": "string", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_IWalletType.user_": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_IWalletType.Exclude_keyofIWalletType.user__", "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_IWalletType.walletId_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "walletId": { "dataType": "string" } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/v1/api/admin/contries', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Country_Create(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Omit_ICountryType.flag-or-countryId-or-status_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "country": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new country_controller_1.Country();
            const promise = controller.Create.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/api/admin/contries', function Country_Contries(request, response, next) {
        const args = {
            status: { "default": true, "in": "query", "name": "status", "dataType": "boolean" },
            offset: { "default": 1, "in": "query", "name": "offset", "dataType": "double" },
            limit: { "default": 100, "in": "query", "name": "limit", "dataType": "double" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "countries": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new country_controller_1.Country();
            const promise = controller.Contries.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/v1/api/admin/contries', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Country_Update(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Omit_ICountryType.flag_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "country": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new country_controller_1.Country();
            const promise = controller.Update.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/v1/api/admin/contries', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Country_Delete(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Pick_ICountryType.countryId_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new country_controller_1.Country();
            const promise = controller.Delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/admin/etats', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Etat_Create(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Omit_IEtatType.etatId-or-status_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "etat": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new etat_controller_1.Etat();
            const promise = controller.Create.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/api/admin/etats', function Etat_etats(request, response, next) {
        const args = {
            status: { "default": true, "in": "query", "name": "status", "dataType": "boolean" },
            offset: { "default": 1, "in": "query", "name": "offset", "dataType": "double" },
            limit: { "default": 100, "in": "query", "name": "limit", "dataType": "double" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "etats": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new etat_controller_1.Etat();
            const promise = controller.etats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/v1/api/admin/etats', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Etat_Update(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Omit_IEtatType.status_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "etat": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new etat_controller_1.Etat();
            const promise = controller.Update.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/v1/api/admin/etats', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Etat_Delete(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Pick_IEtatType.etatId_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new etat_controller_1.Etat();
            const promise = controller.Delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/admin/regions', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Region_Create(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Omit_IRegionType.regionId-or-status_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "city": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new region_controller_1.Region();
            const promise = controller.Create.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/api/admin/regions', function Region_etats(request, response, next) {
        const args = {
            status: { "default": true, "in": "query", "name": "status", "dataType": "boolean" },
            offset: { "default": 1, "in": "query", "name": "offset", "dataType": "double" },
            limit: { "default": 100, "in": "query", "name": "limit", "dataType": "double" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "city": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new region_controller_1.Region();
            const promise = controller.etats.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/v1/api/admin/regions', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Region_Update(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Omit_IRegionType.status_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "city": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new region_controller_1.Region();
            const promise = controller.Update.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/v1/api/admin/regions', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Region_Delete(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Pick_IRegionType.regionId_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new region_controller_1.Region();
            const promise = controller.Delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/users/siginup', function Users_createCustomer(request, response, next) {
        const args = {
            item: { "in": "body", "name": "item", "required": true, "ref": "Omit_ICustomerRequest.userId-or-role-or-otp-or-oldPassword_" },
            success: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.createCustomer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/admin/users/siginup', function Users_createUsers(request, response, next) {
        const args = {
            item: { "in": "body", "name": "item", "required": true, "ref": "Omit_ICustomerRequest.userId-or-region-or-otp-or-password-or-oldPassword_" },
            success: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.createUsers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/v1/api/users', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Users_update(request, response, next) {
        const args = {
            item: { "in": "body", "name": "item", "required": true, "ref": "Omit_ICustomerRequest.password-or-role-or-oldPassword-or-userId-or-otp_" },
            success: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.update.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/v1/api/users/acount/change-phonenumber', function Users_changePhoneNunber(request, response, next) {
        const args = {
            item: { "in": "body", "name": "item", "required": true, "ref": "Pick_ICustomerRequest.userId-or-phone_" },
            success: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.changePhoneNunber.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/users/acount/resend-otp', function Users_resendOTP(request, response, next) {
        const args = {
            item: { "in": "body", "name": "item", "required": true, "ref": "Pick_ICustomerRequest.userId_" },
            success: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.resendOTP.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/users/account/active', function Users_activeAcount(request, response, next) {
        const args = {
            item: { "in": "body", "name": "item", "required": true, "ref": "Pick_IOtp.userId-or-otp_" },
            success: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "token": { "dataType": "string", "required": true }, "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.activeAcount.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/users/signin', function Users_signIn(request, response, next) {
        const args = {
            item: { "in": "body", "name": "item", "required": true, "ref": "Pick_ICustomerRequest.email-or-password_" },
            success: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "token": { "dataType": "string", "required": true }, "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.signIn.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/users/change-password', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Users_changePassword(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Pick_ICustomerRequest.password-or-oldPassword_" },
            success: { "in": "res", "name": "201", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.changePassword.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/v1/api/users/profile', authenticateMiddleware([{ "Bearer": ["admin"] }]), upload.single('file'), function Users_uploadImage(request, response, next) {
        const args = {
            file: { "in": "formData", "name": "file", "required": true, "dataType": "file" },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true } } },
            successResponse: { "in": "res", "name": "201", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.uploadImage.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/v1/api/admin/users/change-status', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Users_acountStatus(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Pick_ICustomerRequest.userId_" },
            success: { "in": "res", "name": "201", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "user": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            authorization: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.acountStatus.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/api/admin/users', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Users_getCustomer(request, response, next) {
        const args = {
            type: { "in": "query", "name": "type", "required": true, "ref": "TypeUser" },
            status: { "default": true, "in": "query", "name": "status", "dataType": "boolean" },
            offset: { "default": 1, "in": "query", "name": "offset", "dataType": "double" },
            limit: { "default": 100, "in": "query", "name": "limit", "dataType": "double" },
            success: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "users": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.getCustomer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/v1/api/users', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Users_Delete(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Pick_ICustomerRequest.userId_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new users_controller_1.Users();
            const promise = controller.Delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/v1/api/admin/wallets', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Wallet_Create(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Omit_IWalletType.user-or-walletId_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "wallet": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new wallet_controller_1.Wallet();
            const promise = controller.Create.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/v1/api/admin/wallets', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Wallet_getWallets(request, response, next) {
        const args = {
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "wallet": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new wallet_controller_1.Wallet();
            const promise = controller.getWallets.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.put('/v1/api/admin/wallets', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Wallet_Update(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Omit_IWalletType.user_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "wallet": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new wallet_controller_1.Wallet();
            const promise = controller.Update.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.delete('/v1/api/admin/wallets', authenticateMiddleware([{ "Bearer": ["admin"] }]), function Wallet_Delete(request, response, next) {
        const args = {
            input: { "in": "body", "name": "input", "required": true, "ref": "Pick_IWalletType.walletId_" },
            succes: { "in": "res", "name": "200", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "any", "required": true }, "status": { "dataType": "enum", "enums": [true], "required": true } } },
            badRequest: { "in": "res", "name": "400", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            noAuth: { "in": "res", "name": "501", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "message": { "dataType": "string", "required": true }, "status": { "dataType": "enum", "enums": [false], "required": true } } },
            request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new wallet_controller_1.Wallet();
            const promise = controller.Delete.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function authenticateMiddleware(security = []) {
        return function runAuthenticationMiddleware(request, _response, next) {
            return __awaiter(this, void 0, void 0, function* () {
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                // keep track of failed auth attempts so we can hand back the most
                // recent one.  This behavior was previously existing so preserving it
                // here
                const failedAttempts = [];
                const pushAndRethrow = (error) => {
                    failedAttempts.push(error);
                    throw error;
                };
                const secMethodOrPromises = [];
                for (const secMethod of security) {
                    if (Object.keys(secMethod).length > 1) {
                        const secMethodAndPromises = [];
                        for (const name in secMethod) {
                            secMethodAndPromises.push((0, authentication_1.expressAuthentication)(request, name, secMethod[name])
                                .catch(pushAndRethrow));
                        }
                        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                        secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                            .then(users => { return users[0]; }));
                    }
                    else {
                        for (const name in secMethod) {
                            secMethodOrPromises.push((0, authentication_1.expressAuthentication)(request, name, secMethod[name])
                                .catch(pushAndRethrow));
                        }
                    }
                }
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
                try {
                    request['user'] = yield promiseAny(secMethodOrPromises);
                    next();
                }
                catch (err) {
                    // Show most recent error as response
                    const error = failedAttempts.pop();
                    error.status = error.status || 401;
                    next(error);
                }
                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            });
        };
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
