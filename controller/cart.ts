import { RequestHandler } from "express";
import { addCartItem, findCartItems, removeCartItem } from "../model/cart";
import { findProducts } from "../model/products";
import resHelper from "../utils/resHelper";

export const addToCart: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const id = req.query.id || false;
  if (!id) res.bad("product not found");
  else
    findProducts([{ _id: id }])
      .then((product) => {
        if (!product) throw { err: "product not found " };
        return addCartItem(product[0]._id, res.locals.user._id).then((data) => {
          if (!data) throw { err: "somthing wrong happend pleas try again" };
          res.done("added to cart");
        });
      })
      .catch((err) => {
        if (err.err) res.bad(err.err);
        else res.bad("somthing went wrong please try again");
      });
};
export const findCarts: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  let range: any = req.query.range;
  try {
    if (range) range = parseInt(req.query.range as string);

    findCartItems(res.locals.user._id, (range as number) || undefined)
      .then((carts) => {
        if (!carts) throw { err: "no cart item found" };
        res.done(carts.cart);
      })
      .catch((err) => {
        if (err.err) res.bad(err.err);
        else res.bad("somthing wrong happned pleas try again");
      });
  } catch {
    res.bad("unvalid range type");
  }
};

export const removeCarts: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const id = req.query.id || false;
  const itemId = req.query.itemid || false;
  if (id && itemId)
    removeCartItem(id as string, itemId as string, (err, rslt) => {
      if (err) res.bad("somthing wrong happned while removing ");
      else if (!rslt) res.bad("no item with this id");
      else res.done("removed");
    });
  else res.bad("somthing bad happend pleas try again");
};
