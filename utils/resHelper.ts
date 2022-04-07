import { Response } from "express";

// we can add anthing to the response without think about capsulation

type resPrmsType = Response & {
  bad: (str: string, args: { status: number }) => void;
  done: () => void;
};

export default (res: Response) => ({
  ...res,
  done(str: string, args?: { status: number; resBody: object }) {
    return res.status(args?.status || 400).json(args?.resBody || { err: str });
  },
  bad(str: string, args?: { status: number; resBody: object }) {
    return res.status(args?.status || 200).json(args?.resBody || { err: str });
  },
});
