"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const secretJwt = process.env.SECRETJWT;
function expressAuthentication(request, securityName, scopes) {
    if (securityName === "Bearer") {
        return new Promise((resolve, reject) => {
            try {
                if (!request.headers["authorization"])
                    return reject(new Error("Aucun jeton fourni"));
                const authHearder = request.headers["authorization"];
                const barrerToken = authHearder.split(" ");
                const token = barrerToken[1];
                jwt.verify(token, secretJwt !== null && secretJwt !== void 0 ? secretJwt : "", (err, payload) => {
                    if (err) {
                        const message = err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
                        return reject(message);
                    }
                    resolve(payload);
                });
            }
            catch (error) {
                console.log("error", error);
                return reject(error);
            }
        });
    }
    return Promise.reject({});
}
exports.expressAuthentication = expressAuthentication;
