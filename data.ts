import mongoose from "mongoose";
import { cartInterface, dbInterface, productsInterface } from "./interfaces/db";

mongoose.connect("mongodb://localhost:27017/test", {}, (err) => {
  if (err) console.log(err);
  else console.log("connected");
});

const productScheam = new mongoose.Schema<productsInterface>({
  ownerId: String,
  name: String,
  cover: String,
  price: String,
  description: String,
  ratting: Number,
  tags: [{ name: String }],
});

const cartSchema = new mongoose.Schema<cartInterface>({
  itemId: String,
});

const dbSchema = new mongoose.Schema<dbInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [cartSchema],
  },
  pic: {
    type: String,
    default: "https://i.pravatar.cc/300",
  },
});

const db = mongoose.model<dbInterface>("db", dbSchema);

export const dbProducts = mongoose.model<productsInterface>(
  "products",
  productScheam
);

export default db;
