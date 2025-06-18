import bodyParser from "body-parser";
import express from "express";
import userRoutes from "./Routes/dataRoutes.js";
import morgan from "morgan";

const app = express();

app.use(bodyParser.json());

app.use('/api/data', dataRoutes);
app.use(morgan("dev"));

export default app;
