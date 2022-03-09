"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4042;
const dbUrl = "mongodb+srv://ekival670:Ff9HdrH5h5HIqer8@cluster0.to9gj.mongodb.net/ekivalApp?retryWrites=true&w=majority";
// const dbUrl = "mongodb://127.0.0.1:27017/ekival_db"
const app = new app_1.default(PORT, dbUrl);
app.listen();
