import express from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./routes/auth.routes.js";

const app = express();

app.use(bodyParser.json());
app.use(morgan());
app.use('/api/email', router);

export default app;