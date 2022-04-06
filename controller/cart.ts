import { RequestHandler } from "express";
import { checkReqObject } from "./validation";

export const addToCart: RequestHandler = (req, res) => {
  const headers = req.headers;
  const checkReq = checkReqObject(["token", "itemId"], headers);
};
