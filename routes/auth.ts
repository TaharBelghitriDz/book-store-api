import { login, signIn } from "../controller";
import { Router } from "express";
const authRout = Router();

authRout.post("/login", login);
authRout.post("/signup", signIn);

export default authRout;
