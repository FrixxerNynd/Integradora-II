import dataRoutes from "./Routes/dataRoutes.js";
import express from 'express';
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";


const app = express();
//Asegurador de Rutas
app.use(cors());

app.use(bodyParser.json());
app.use(morgan());
app.use('/api/data', dataRoutes);

export default app;
