import config from "config";
import { get } from "lodash";
import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  createAccessToken,
  updateSession,
  findSessions
} from "../service/session.service";
import { sign } from "../utils/jwt.utils";
import log from "../logger";

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create access token
  const accessToken = createAccessToken({
    user,
    session,
  });

  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get("refreshTokenTtl"), // 1 year
  });

  // send refresh & access token back

  res.send({ accessToken, refreshToken });
}

// ivalidate user
export async function invalidateUserSessionHandler(
  req: Request,
  res: Response
) {
  // get the session id
  const sessionId = get(req, "user.session");

  // update session
  try {
    await updateSession({ _id: sessionId }, { valid: false });
    // return the status 200 : OK
    return res.sendStatus(200);
  } catch (e: any) {
    log.info(e);
  }
}

// for handling user session
export async function getUserSessionsHandler(req: Request, res: Response) {
  // get the user
  const userId = get(req, "user._id");

  // get the user session
  const session = await findSessions({ user: userId, valid: true });

  res.send(session);
}
