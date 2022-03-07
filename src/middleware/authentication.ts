import * as express from "express";
import * as jwt from "jsonwebtoken";

const secretJwt = process.env.SECRETJWT as string

export function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    if (securityName === "Bearer") {
        return new Promise((resolve, reject) => {
            try {
                if (!request.headers["authorization"])
                    return reject(new Error("Aucun jeton fourni"));
                const authHearder = request.headers["authorization"];
                const barrerToken = authHearder.split(" ");
                const token = barrerToken[1];
                jwt.verify(token, secretJwt ?? "", (err, payload) => {
                    if (err) {
                        const message = err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
                        return reject(message);
                    }
                    resolve(payload);
                });
            } catch (error) {
                console.log("error", error);
                return reject(error);
            }
        });
    }
    return Promise.reject({});
}
