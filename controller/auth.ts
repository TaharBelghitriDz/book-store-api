import { RequestHandler } from "express-serve-static-core";
import { ValidationPrms } from "../interfaces/authRes";
import { dbInterface } from "../interfaces/db";
import { addUser, findUser } from "../model/user";
import resH from "../utils/resHelper";
import { comparePassword } from "../utils/hash";
import { tokenSign, tokenVrfy } from "../utils/token";
import { checkReqObject, validation } from "../utils/validation";

export const signIn: RequestHandler = (req, res) => {
  const body = req.body;
  const checkReq = checkReqObject(
    ["name", "password", "email", "confirmPassword"],
    body
  );
  let checkVaules = validation(body);

  if (typeof checkReq === "string")
    res.status(400).json({ err: checkReq + " is missing" });
  else if (typeof checkVaules !== "object")
    res.status(400).json({ msg: checkVaules });
  else addUser({ ...checkVaules, res });
};

export const login: RequestHandler = (req, Fres) => {
  const body = req.body;
  let res = resH(Fres);
  const checkReq: ValidationPrms | string = checkReqObject(
    ["email", "password"],
    body
  );
  if (typeof checkReq === "string") res.bad(checkReq + " is missing");
  else {
    const checkVaules = validation(checkReq);
    if (typeof checkVaules === "string") res.bad(checkVaules);
    else {
      findUser<dbInterface>({ email: checkVaules.email }, (err, data) => {
        if (err || !data) res.bad("unvalid email");
        else
          comparePassword(checkReq.password, data.password, (err, rslt) => {
            if (err || !rslt) res.bad("unvalid password");
            else
              tokenSign({
                str: data.name,
                key: `${data._id}`,
                clb: (_, token) => {
                  if (!token) res.bad("somthing went wrong");
                  else res.done(token);
                },
              });
          });
      });
    }
  }
};

export const checkUser: RequestHandler = (req, res, next) => {
  const token = req.headers.token;
  const name = req.headers.name as string;
  if (!token || !name)
    res.status(400).json({
      err: (token ? "name" : "token") + " is missing pleas try again",
    });
  else
    findUser<dbInterface>({ name })
      .then((user) => {
        if (!user) throw { err: "unvalid user" };
        tokenVrfy(token as string, `${user._id}`, (err, _) => {
          if (err) throw { err: "unvalid token" };
          res.locals.user = user;
          next();
        });
      })
      .catch((err) => {
        if (err.err) res.status(400).json({ err: err.err });
        else res.status(500).json({ err: "somthing wrong happend " });
      });
};
