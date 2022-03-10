"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4042;
const dbUrl = process.env.DBURL || "mongodb://127.0.0.1:27017/ekival_db";
/**
 * test
 */
const app = new app_1.default(PORT, dbUrl);
app.listen();
