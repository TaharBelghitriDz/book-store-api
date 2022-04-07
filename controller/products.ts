import { RequestHandler } from "express";
import resHelper from "../utils/resHelper";
import { checkReqObject, ProductValidation } from "../utils/validation";
import {
  addProducts,
  findProducts,
  removeProducts,
  updateProducts,
} from "../model/products";

export const addProduct: RequestHandler = (req, resF) => {
  const body = req.body;
  const res = resHelper(resF);

  const dataNeeded = ["cover", "price", "description", "tags"];
  const checkReq = checkReqObject(body, dataNeeded);

  if (typeof checkReq === "string") res.bad(checkReq + " is missing");
  else {
    const validate = ProductValidation(body);

    if (typeof validate === "string") res.bad(validate);
    else
      addProducts(
        {
          ...req.body,
          tags: (body.tags as Array<string>).map((e) => {
            return { name: e };
          }),
          name: res.locals.user.name,
          ownerId: `${res.locals.user._id}`,
        },
        (err) => {
          if (err) res.bad("somthing went wrong please try again");
          else res.done("product added");
        }
      );
  }
};

export const removeProduct: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const id = req.query?.id || false;

  if (!id) res.bad("id is missing please try again");
  else
    removeProducts(
      [{ _id: res.locals.user._id }, { ownerId: res.locals.user._id }],
      (err, data) => {
        if (err || !data) res.bad("somthing went wrong");
        else if (data) res.done("removed");
      }
    );
};

export const editProduct: RequestHandler = (req, resF) => {
  const body = req.body;
  const res = resHelper(resF);

  const dataNeeded = ["cover", "price", "description", "tags"];
  const checkReq = checkReqObject(body, dataNeeded);

  if (typeof checkReq === "string") res.bad(checkReq + " is missing");
  else {
    const validate = ProductValidation(body);

    if (typeof validate === "string") res.bad(validate);
    else
      updateProducts(
        { _id: res.locals.user.id },
        {
          ...req.body,
          name: res.locals.user.name,
          ownerId: `${res.locals.user._id}`,
        },
        (err, _) => {
          if (err) res.bad("somthing wrong happend happned while saving");
          else res.done("updated");
        }
      );
  }
};

export const findProduct: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const query = req.query;
  const name = query.name || false;
  const tag = query.tag
    ? (query.tag as Array<string>).map((e) => {
        return { name: e };
      })
    : false;

  if (name || tag)
    findProducts(
      [{ name: `${name as string}` }, { tag: { $elemMatch: { ...tag } } }],
      (err, data) => {
        if (err) res.bad("somothing went wrong");
        else if (!data) res.bad("no result found");
        else res.done(JSON.stringify(data));
      }
    );
  else
    findProducts([], (err, data) => {
      if (err) res.bad("somthing bad happend");
      else res.done(JSON.stringify(data));
    });
};
