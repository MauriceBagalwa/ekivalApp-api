import App from "./app";

const PORT: any = process.env.PORT || 4042
const dbUrl = process.env.DBURL || "mongodb://127.0.0.1:27017/ekival_db"
/**
 * test
 */
const app = new App(PORT, dbUrl);
app.listen();
