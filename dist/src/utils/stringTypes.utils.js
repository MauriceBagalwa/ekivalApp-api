"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = exports.getCodeValidation = void 0;
var messagebird = require("messagebird")("bJwOZ42MJ4widd7laI1lyIqHc");
function getCodeValidation(length) {
    return Math.floor(Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
}
exports.getCodeValidation = getCodeValidation;
function sendSMS(phone, message) {
    var params = {
        originator: "Pelekapp",
        recipients: ["".concat(phone)],
        body: message,
    };
    // console.log(body);
    messagebird.messages.create(params, function (err, response) {
        if (!err) {
            return console.log(response);
        }
    });
}
exports.sendSMS = sendSMS;
