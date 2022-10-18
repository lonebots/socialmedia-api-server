import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";
import { get } from "lodash";
import {reIssueAccessToken} from '../service/session.service'

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get the access token -- from the header
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  // get the refresh token from the custom header
  const refreshToken = get(req, "headers.x-refresh");

  //
  if (!accessToken) return next();

  // decode - defined in utils -- to label the token as expired or not expired aka --> decode the token
  const { decoded, expired } = decode(accessToken);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;
    return next();
  }

  // if accesstoken got expired and then validate it with a `valid` refreshToken
  if (expired && refreshToken) {
    // another function for reIssueing the new accessToken
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    // newAccessToken ?: add it to response header
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      // update decoded value
      const { decoded } = decode(newAccessToken);

      // append the new value of the accessToken to the user object
      // @ts-ignore
      req.user = decoded;
    }
    return next();

    return next();
  }
};

export default deserializeUser;
