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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const logger_1 = __importDefault(require("./utils/logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = require("../dist/routes");
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const tsoa_1 = require("tsoa");
class App {
    constructor(port, dbUrl) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.dbUrl = dbUrl;
        this.initMiddleware();
    }
    // INIT MIDDLEWARE
    initMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use(express_1.default.json());
        this.express.use(body_parser_1.default.json());
        this.express.use((0, cors_1.default)());
        this.initializeDbConnection();
        this.initializeErrorHanlding();
        this.express.use(body_parser_1.default.urlencoded({
            extended: true,
        }));
        this.express.use(express_1.default.static('public'));
        this.express.use("/images", express_1.default.static(__dirname + "/images"));
        this.express.use("/uploads", express_1.default.static(__dirname + "/uploads"));
        // this.express.use("/pdf", express.static(__dirname + "/public/pdf"));
        this.express.use(body_parser_1.default.json());
        (0, routes_1.RegisterRoutes)(this.express);
        this.express.use("/docs", swagger_ui_express_1.default.serve, (_req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.send(swagger_ui_express_1.default.generateHTML(yield Promise.resolve().then(() => __importStar(require("../dist/swagger.json")))));
        }));
        this.express.use(function errorHandler(err, req, res, next) {
            if (err instanceof tsoa_1.ValidateError) {
                console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
                return res.status(422).json({
                    message: "Validation Failed",
                    details: err === null || err === void 0 ? void 0 : err.fields,
                });
            }
            if (err instanceof Error) {
                return res.status(500).json({
                    message: err.message
                });
            }
            next();
        });
    }
    initializeErrorHanlding() {
        this.express.use(error_middleware_1.default);
    }
    initializeDbConnection() {
        try {
            mongoose_1.default.connect(this.dbUrl);
            logger_1.default.info("connected to ekivaldb");
        }
        catch (err) {
            logger_1.default.error("Error to connect to db...");
            process.exit(1);
        }
    }
    listen() {
        this.express.listen(this.port, () => {
            logger_1.default.info(`server is runing at http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
