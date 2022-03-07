"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const logger_1 = __importDefault(require("./utils/logger"));
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
        // this.express.use(
        //   "/docs",
        //   swaggerUi.serve,
        //   async (_req: ExRequest, res: ExResponse) => {
        //     return res.send(
        //       swaggerUi.generateHTML(await import("../dist/swagger.json"))
        //     );
        //   }
        // );
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
