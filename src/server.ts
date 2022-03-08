import App from "./app";

const PORT: any = process.env.PORT || 4042
// const dbUrl = "mongodb+srv://ekival670:Ff9HdrH5h5HIqer8@cluster0.to9gj.mongodb.net/ekivalApp?retryWrites=true&w=majority"
const dbUrl = "mongodb://127.0.0.1:27017/ekival_db"

const app = new App(PORT, dbUrl);
app.listen();
 