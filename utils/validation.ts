import { ValidationPrms } from "../interfaces/authRes";
import { productsInterface } from "../interfaces/db";
import { ReqProduct } from "../interfaces/products";

export const validation: ({}: ValidationPrms) => string | ValidationPrms = (
  args
): string | ValidationPrms => {
  let { name, password, email, confirmPassword } = args;
  if (!(name || password || email || confirmPassword))
    return "please fill the form";

  if (name)
    if (name.length > 20) return "name to long";
    else if (name.length < 5) return "name to short";

  const checkEmail = email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if (!checkEmail) return "unvalid email ";

  if (password.length > 30) return "password to long";
  else if (password.length < 8) return "to short password";
  else if (confirmPassword && confirmPassword !== password)
    return "check your password and try again";

  return { ...args };
};

export const checkReqObject = <T>(args: string[], reqBody: any): T | string => {
  for (const n of args) {
    if (!reqBody[n]) return n;
  }
  return { ...reqBody };
};

export const ProductValidation = (args: ReqProduct): string | ReqProduct => {
  const { tags, cover, description, price } = args;

  // need to check tags and description and price

  const checkCover = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(cover);
  if (!checkCover) return "unvalid cover url";

  return args;
};
