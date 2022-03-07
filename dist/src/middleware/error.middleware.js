"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHiddleware(error, req, res, next) {
    var status = error.status || 500;
    var message = error.message || "Something went wrong.";
    res.status(status).send({
        status: "error",
        data: null,
        message: message,
    });
}
exports.default = errorHiddleware;
