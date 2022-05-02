import express from "express";
import routes from "../routes/index.js";
import pino from "pino-http";

const app = express();
app.use(pino());
routes(app);
export default app;
