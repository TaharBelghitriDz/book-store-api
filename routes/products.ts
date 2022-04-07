import {
  addProduct,
  removeProduct,
  findProduct,
  editProduct,
} from "../controller";
import { Router } from "express";
import { checkUser } from "../controller/auth";

const productRout = Router();

productRout.get("/find", findProduct);

productRout.use(checkUser);
productRout.post("/add", addProduct);
productRout.post("/remove", removeProduct);
productRout.post("/edit", editProduct);

export default productRout;
