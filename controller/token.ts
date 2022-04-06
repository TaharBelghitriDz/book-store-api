import jwt, { SignCallback, VerifyOptions } from "jsonwebtoken";

export const validateToken = (token: string) => {
  // some validation for token and maybe will grow after
  if (token.length > 100) return;
  else if (token.length < 30) return;
  return token;
};

export const tokenVrfy = (token: string, key: string, clb: VerifyOptions) =>
  jwt.verify(token, key, clb);

export const tokenSign = (args: {
  str: string;
  key: string;
  clb: SignCallback;
}) => jwt.sign(args.str, args.key, args.clb);
