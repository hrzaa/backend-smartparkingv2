import express from "express";
import { publicRouter } from "../routes/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { apiRouter } from "../routes/api.js";
import cors from "cors";

export const web = express();
web.use(express.json());
web.use(cors());

web.use(publicRouter);
web.use(apiRouter);


web.use(errorMiddleware);