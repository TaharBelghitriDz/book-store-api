import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import reqErrorHandler from "./utils/errorHandler";
import helmet from "helmet";
import { authRout } from "./routes";
import productRout from "./routes/products";
import cartRout from "./routes/cart";
import db from "./data";
// fake avatar picyure https://pravatar.cc/

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: 100 }));
app.use(cors());
app.use(helmet());

// routes

app.use("/auth", authRout);
app.use("/product", productRout);
app.use("/cart", cartRout);

const port = process.env.PORT || 5000;

app.all("*", (req, res) => {
  res.status(400).json({ err: "unvalid url" });
});
app.use(reqErrorHandler);

app.listen(5000, () => console.log("server started on port " + port));
