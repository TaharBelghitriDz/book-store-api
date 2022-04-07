import { RequestHandler } from "express";
import { addCartItem } from "../model/cart";
import { findProducts } from "../model/products";
import resHelper from "../utils/resHelper";

// working on it now

export const addToCart: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const id = req.query.id || false;
  if (!id) res.bad("cart item not found");
  else
    findProducts([{ _id: id }])
      .then(async (product) => {
        if (!product) throw { err: "product not found " };
        return addCartItem(product[0]._id, res.locals.user._id);
      })
      .catch((err) => {
        if (err.err) res.bad(err.err);
        else res.bad("somthing went wrong please try again");
      });
};
export const findCarts: RequestHandler = (req, res) => {};
export const removeCarts: RequestHandler = (req, res) => {};
