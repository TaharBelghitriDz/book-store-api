import jwt, { SignCallback, VerifyCallback } from "jsonwebtoken";

export const tokenVrfy = (token: string, key: string, clb?: VerifyCallback) =>
  jwt.verify(token, key, clb);

export const tokenSign = (args: {
  str: string;
  key: string;
  clb: SignCallback;
}) => jwt.sign(args.str, args.key, args.clb);
