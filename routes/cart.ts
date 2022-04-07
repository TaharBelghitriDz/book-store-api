import { Router } from "express";
import { checkUser } from "../controller/auth";
import { addToCart, findCarts, removeCarts } from "../controller/cart";

const cartRout = Router();

cartRout.get("/find", findCarts);
cartRout.use(checkUser);
cartRout.post("/add", addToCart);
cartRout.post("/remove", removeCarts);

export default cartRout;
