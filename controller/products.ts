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

  const dataNeeded = ["cover", "price", "description", "tags", "name"];
  const checkReq = checkReqObject(dataNeeded, body);

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
          name: req.body.name,
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
  const id = req.query.id || false;

  if (!id) res.bad("id is missing please try again");
  else
    removeProducts(
      [{ _id: `${id}` }, { ownerId: `${res.locals.user._id}` }],
      (err, data) => {
        if (err || !data) res.bad("somthing went wrong ");
        else if (data) res.done("removed");
      }
    );
};

export const editProduct: RequestHandler = (req, resF) => {
  const body = req.body;
  const res = resHelper(resF);
  const id = req.query.id;

  const dataNeeded = ["cover", "price", "description", "tags", "name"];
  const checkReq = checkReqObject(dataNeeded, body);

  if (typeof checkReq === "string") res.bad(checkReq + " is missing");
  else {
    const validate = ProductValidation(body);

    if (typeof validate === "string") res.bad(validate);
    else
      updateProducts(
        { _id: id, ownerId: res.locals.user.id },
        {
          ...req.body,
          tags: (body.tags as Array<string>).map((e) => {
            return { name: e };
          }),
          name: res.locals.user.name,
          ownerId: `${res.locals.user._id}`,
        },
        (err, updated) => {
          if (err) res.bad("somthing wrong happend happned while saving");
          else if (updated) res.done("updated");
          else res.bad("unvalid product id");
        }
      );
  }
};

export const findProduct: RequestHandler = (req, resF) => {
  const res = resHelper(resF);
  const query = req.query;
  const name = query.name || false;
  const id = query.id || false;
  const tag = query.tag
    ? (query.tag as string).split(" ").map((e) => {
        return { tags: { $elemMatch: { name: e } } };
      })
    : false;

  if (name || tag || id)
    findProducts(
      id
        ? [{ _id: id }]
        : [{ name: `${name as string}` }, ...(tag as Array<object>)],
      (err, data) => {
        if (err) res.bad("somothing went wrong");
        else if (!data) res.bad("no result found");
        else res.done(data);
      }
    );
  else
    findProducts([{}, {}], (err, data) => {
      if (err) res.bad("somthing bad happend");
      else res.done(data);
    });
};
