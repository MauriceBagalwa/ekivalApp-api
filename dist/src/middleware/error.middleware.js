"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHiddleware(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || "Something went wrong.";
    res.status(status).send({
        status: "error",
        data: null,
        message,
    });
}
exports.default = errorHiddleware;
