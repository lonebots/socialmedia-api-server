import { Express, Request, Response } from "express";

export default function (app: Express) {
  // healthcheck route
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // register user

  // user login 

  // user session 

  // user logout
}
