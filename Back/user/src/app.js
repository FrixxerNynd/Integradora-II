import express from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import router from "./routes/user.routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(morgan());
app.use('/api/users', router);

export default app;
