import { ErrorRequestHandler } from "express-serve-static-core";

const reqErrorHandler: ErrorRequestHandler = (err: Error, _, res) => {
  res
    .status(res.statusCode !== 200 ? res.statusCode : 500)
    .json({ err: "somthing went wrong please try again" });
};
export default reqErrorHandler;
