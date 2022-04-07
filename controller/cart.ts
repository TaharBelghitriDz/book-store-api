import { RequestHandler } from "express";
import { addCartItem } from "../model/cart";
import { findProducts } from "../model/products";
import resHelper from "../utils/resHelper";

export const addToCart: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const id = req.query.id || false;
  if (!id) res.bad("cart item not found");
  else
    findProducts([{ _id: id }])
      .then((product) => {
        if (!product) throw { err: "product not found " };
        return addCartItem(product[0]._id, res.locals.user._id).then(
          (data) => {}
        );
      })
      .catch((err) => {});
};
export const findCarts: RequestHandler = (req, res) => {};
export const removeCarts: RequestHandler = (req, res) => {};
