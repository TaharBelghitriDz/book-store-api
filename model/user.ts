import { Response } from "express";
import { tokenSign } from "../utils/token";
import { ValidationPrms } from "../interfaces/authRes";
import { FilterQuery } from "mongoose";
import db from "../data";

export const findUser = <T>(
  query: FilterQuery<T>,
  cb?: (err: Error | null, data: T) => void
) => db.findOne(query, cb);

export const addUser = (args: ValidationPrms & { res: Response }) => {
  let { name, password, email, res } = args;
  db.findOne({ $or: [{ name }, { email }] }).exec((err, result) => {
    console.log(result);

    if (err)
      res.status(400).json({ err: "somthing went wrong please try again" });
    else if (result)
      res.status(400).json({
        err: (name === result.name ? "name" : "email") + " already used",
      });
    else {
      new db({ name, email, password }).save((err, data) => {
        console.log("heree");

        if (err) res.status(400).json({ err: "somthing went wrong" });
        else
          tokenSign({
            str: data.email,
            key: `${data._id}`,
            clb(err, token) {
              if (err)
                res
                  .status(400)
                  .json({ err: "somthing went wrong pleas try again" });
              else res.status(200).json({ token });
            },
          });
      });
    }
  });
};
