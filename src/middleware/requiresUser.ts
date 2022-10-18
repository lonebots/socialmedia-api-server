import { NextFunction, Request, Response } from "express";
import { get } from "lodash";

const requiresUser = (req: Request, res: Response, next: NextFunction) => {
  const user = get(req, "user");

  if (!user) {
    console.log("requiresUser failed");
    return res.sendStatus(403);
  }
  return next();
};

export default requiresUser;
