import App from "./app";
import config from "config";

const PORT: any = process.env.PORT || config.get<number>("port")
const app = new App(PORT, config.get<string>("dbUrl"));
app.listen();
