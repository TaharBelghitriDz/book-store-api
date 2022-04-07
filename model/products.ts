import { FilterQuery, SaveOptions } from "mongoose";
import { dbProducts } from "../data";
import { dbInterface, productsInterface } from "../interfaces/db";

export const addProducts = (
  args: productsInterface,
  clb: (err: Error | null) => void
) => new dbProducts(args).save(clb);

export const removeProducts = (
  args: [{ _id: string }, { ownerId: string }],
  clb: (err: Error, rslt: productsInterface) => void
) => dbProducts.findOneAndRemove({ $and: args }, clb);

export const findProducts = (
  args: FilterQuery<productsInterface>[],
  clb?: (err: Error, data: productsInterface[]) => void,
  range: number = 0
) =>
  dbProducts
    .find({ $or: args }, clb)
    .skip(range)
    .limit(range + 10);

export const updateProducts = (
  filter: FilterQuery<productsInterface>,
  newData: dbInterface,
  clb: (err: Error, rslt: any) => void
) => dbProducts.updateOne(filter, newData, clb);
