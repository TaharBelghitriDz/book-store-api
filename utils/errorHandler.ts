import { ErrorRequestHandler } from "express-serve-static-core";

const reqErrorHandler: ErrorRequestHandler = (err: Error, _, res) =>
  res
    .status(400)
    .json({ err: err.message || "somthing went wrong please try again" });

export default reqErrorHandler;
