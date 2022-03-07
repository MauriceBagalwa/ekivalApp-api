"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var tsoa_1 = require("tsoa");
var google_libphonenumber_1 = require("google-libphonenumber");
var users_ = [
    { id: 1, email: "Bin", name: "jacob", phoneNumber: "123" },
    { id: 2, email: "louis", name: "ngambo", phoneNumber: "567" },
];
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Users.prototype.getUsers = function () {
        return users_;
    };
    Users.prototype.createUser = function (values) {
        var phoneUtil = google_libphonenumber_1.PhoneNumberUtil.getInstance();
        var valid = phoneUtil.isValidNumber(phoneUtil.parse(values.phoneNumber));
        console.log(valid);
        return __assign({}, values);
    };
    __decorate([
        (0, tsoa_1.Get)()
    ], Users.prototype, "getUsers", null);
    __decorate([
        (0, tsoa_1.Post)(),
        __param(0, (0, tsoa_1.Body)())
    ], Users.prototype, "createUser", null);
    Users = __decorate([
        (0, tsoa_1.Route)("users")
    ], Users);
    return Users;
}(tsoa_1.Controller));
exports.Users = Users;
