import express from "express";
import { publicRouter } from "../routes/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { apiRouter } from "../routes/api.js";
import cors from "cors";
import path from "path";

export const web = express();

const publicPath = path.resolve("src", "public");
web.use(express.static(publicPath));

web.use(express.json());
web.use(cors());

web.use(publicRouter);
web.use(apiRouter);

web.use(errorMiddleware);
