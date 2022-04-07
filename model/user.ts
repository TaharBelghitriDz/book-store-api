import { Response } from "express";
import { tokenSign } from "../utils/token";
import { ValidationPrms } from "../interfaces/authRes";
import { FilterQuery } from "mongoose";
import db from "../data";
import { HashPassword } from "../utils/hash";

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
      HashPassword(password, (err, hashedPassword) => {
        if (err)
          res.status(400).json({ err: "somthing went wrong pleas try again" });
        else
          new db({ name, email, password: hashedPassword }).save(
            (err, data) => {
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
            }
          );
      });
    }
  });
};
