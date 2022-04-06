import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express-serve-static-core";
import reqErrorHandler from "./utils/errorHandler";
import helmet from "helmet";
import { authRout } from "./routes";
import data from "./data";
// fake avatar picyure https://pravatar.cc/

dotenv.config();
const app = express();
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) console.log("error");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: 100 }));
app.use(cors());
app.use(helmet());

// routes

app.use("/auth", authRout);

const port = process.env.PORT || 5000;

app.all("*", (req, res) => {
  res.status(400).json({ err: "somthing went wrong" });
});
app.use(reqErrorHandler);

app.listen(5000, () => console.log("server started on port " + port));
