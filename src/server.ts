import App from "./app";
import config from "config";

const app = new App(config.get<number>("port"),config.get<string>("dbUrl"));
app.listen();
