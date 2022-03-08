"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../resources/users/user");
function admin(request) {
    const result = request;
    const { role } = result.user;
    return role === user_1.ROLES.ADMIN;
}
function allUserSystem(request) {
    const result = request;
    const { role } = result.user;
    return role != user_1.ROLES.CUSTOMER;
}
function user(request) {
    const result = request;
    const { _id } = result.user;
    return _id;
}
exports.default = { admin, allUserSystem, user };
