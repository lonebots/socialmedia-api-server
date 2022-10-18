import { Express, Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
} from "../controller/session.controller";
import { validateRequest, requiresUser } from "../middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";

export default function (app: Express) {
  // healthcheck route
  app.get("/api/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // register user
  //validation is done -- inorde to ensure security and related stuffs.
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // user login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // user session

  // user logout
  app.delete("api/sessions", requiresUser, invalidateUserSessionHandler);
}
