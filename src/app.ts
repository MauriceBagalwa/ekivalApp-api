import bodyParser from "body-parser";
import express, {
  Application,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction
} from "express";
import ErrorMiddlware from "./middleware/error.middleware";
import logger from "./utils/logger";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../dist/routes";
import helmet from "helmet";
import mongoose from "mongoose";
import cors from "cors";
import { ValidateError } from "tsoa";

export default class App {
  public express: Application;
  public port: number;
  public dbUrl: string;

  constructor(port: number, dbUrl: string) {
    this.express = express();
    this.port = port;
    this.dbUrl = dbUrl;
    this.initMiddleware();
  }

  // INIT MIDDLEWARE
  private initMiddleware(): void {

    this.express.use(helmet());
    this.express.use(cors());

    this.express.use(function (req: ExRequest,
      res: ExResponse,
      next: NextFunction) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Cross-Origin-Resource-Policy", "cross-origin");
      res.header("Cross-Origin-Opener-Policy", "cross-origin");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    this.express.use(express.json());
    this.express.use(bodyParser.json());
    this.initializeDbConnection();
    this.initializeErrorHanlding();
    require("dotenv").config();
    this.express.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );

    this.express.use(express.static('public'));
    this.express.use("/images", express.static(__dirname + "/images"));
    this.express.use("/uploads", express.static(__dirname + "/uploads"));
    // this.express.use("/pdf", express.static(__dirname + "/public/pdf"));

    this.express.use(bodyParser.json());
    RegisterRoutes(this.express);

    this.express.use(
      "/docs",
      swaggerUi.serve,
      async (_req: ExRequest, res: ExResponse) => {
        return res.send(
          swaggerUi.generateHTML(await import("../dist/swagger.json"))
        );
      }
    );

    this.express.use(function errorHandler(
      err: unknown,
      req: ExRequest,
      res: ExResponse,
      next: NextFunction
    ): ExResponse | void {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
          message: "Validation Failed",
          details: err?.fields,
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

  private initializeErrorHanlding(): void {
    this.express.use(ErrorMiddlware);
  }

  private initializeDbConnection(): void {
    try {
      mongoose.connect(this.dbUrl);
      logger.info("connected to ekivaldb");
    } catch (err) {
      logger.error("Error to connect to db...");
      process.exit(1);
    }
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      logger.info(`server is runing at http://localhost:${this.port}`);
    });
  }
}
