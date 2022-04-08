import db from "../data";
import { dbInterface } from "../interfaces/db";

export const addCartItem = (id: string, userId: string) =>
  db.findOneAndUpdate(
    { _id: `${userId}` },
    { $push: { cart: { itemId: id } } },
    { multi: false, new: true }
  );

export const findCartItems = (id: string, range: number = 0) =>
  db
    .findOne({ _id: id })
    .skip(range)
    .limit(range + 5);

export const removeCartItem = (
  id: string,
  itemId: string,
  cb: (err: Error, rslt: dbInterface) => void
) =>
  db.findOneAndUpdate(
    { cart: { $elemMatch: { itemId: id } } },
    { $pull: { cart: { _id: itemId, itemId: id } } },
    cb
  );
