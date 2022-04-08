import { Document } from "mongoose";

export interface dbInterface extends Document {
  name: string;
  email: string;
  password: string;
  pic: string;
  cart: cartInterface[];
}

export interface cartInterface extends Document {
  itemId: string;
}

export interface productsInterface extends Document {
  ownerId: string;
  name: string;
  cover: string;
  price: string;
  description: string;
  ratting: string;
  tags: string[];
  cart: { itemId: string }[];
}
