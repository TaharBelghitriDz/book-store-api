import bcrypt from "bcrypt";

const saltRounds = 8;

export const HashPassword = (
  str: string,
  clb: (err: Error | undefined, hash: string) => {}
) => bcrypt.hash(str, saltRounds, clb);

export const comparePassword = (
  str: string,
  str2: string,
  clb: (err: Error | undefined, rslt: boolean) => void
) => bcrypt.compare(str, str2, clb);
