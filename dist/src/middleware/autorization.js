"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function role(request, _role) {
    const result = request;
    const { role } = result.user;
    return _role === role;
}
function user(request) {
    const result = request;
    return result.user;
}
exports.default = { role, user };
