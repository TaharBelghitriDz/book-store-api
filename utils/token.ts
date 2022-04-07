import jwt, { SignCallback } from "jsonwebtoken";
import { Query } from "mongoose";

export const tokenVrfy = (
  token: string,
  key: string,
  clb?: (err: any, decode: any) => void
) => jwt.verify(token, key, clb);

export const tokenSign = (args: {
  str: string;
  key: string;
  clb: SignCallback;
}) => jwt.sign(args.str, args.key, args.clb);

export const checkToken = <T>(db: Query<T | null, any>) => {};
