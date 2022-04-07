import db from "../data";
import { cartInterface } from "../interfaces/db";

export const addCartItem = (id: string, userId: string) =>
  db.findOneAndUpdate(
    { _id: `${userId}` },
    { $push: { cart: { itemId: id } } },
    { multi: false, new: true }
  );

export const findCartItem = (id: string, range: number = 0) =>
  db
    .findOne({ cart: { $elemMatch: { itemId: id } } })
    .skip(range)
    .limit(range + 5);

export const removeCartItem = (id: string) =>
  db.findOneAndUpdate(
    { cart: { $elemMatch: { itemId: id } } },
    { $pull: { cart: { $elemMatch: { itemId: id } } } },
    { multi: false, new: true }
  );
