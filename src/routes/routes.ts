import { Express, Request, Response } from "express";
import {createUserHandler} from "../controller/user.controller";
import {createUserSessionHandler} from "../controller/session.controller";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema, createSessionSchema } from "../schema/user.schema";

export default function (app: Express) {
  // healthcheck route
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // register user
  //validation is done -- inorde to ensure security and related stuffs.
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // user login
  app.post(
    "/api/sessions",
    validateRequest(createSessionSchema),
    createUserSessionHandler
  );

  // user session

  // user logout
}
