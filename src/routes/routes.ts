import { Express, Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import { validateRequest, requiresUser } from "../middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";

import {
  createPostSchema,
  updatePostSchema,
  deletePostSChema,
} from "../schema/post.schema";

import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
} from "../controller/post.controller";
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
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // user logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  //****POST SECTION ROUTES
  // create post
  app.post(
    "/api/posts",
    requiresUser,
    validateRequest(createPostSchema),
    createPostHandler
  );

  // update post
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  // get post
  app.get("/api/posts/:postId,", getPostHandler);

  // delete post
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSChema)],
    deletePostHandler
  );
}
