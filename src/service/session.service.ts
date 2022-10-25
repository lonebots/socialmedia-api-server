import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import { UserDocument } from "../model/user.model";
import Session, { SessionDocument } from "../model/session.model";
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "../service/user.service";

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
  session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}

// reissueing the token
export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  // decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false; // if decoded doesn't exist

  // find the user session
  const session = await Session.findById(get(decoded, "_id"));

  // make sure that it is still valid
  if (!session || !session?.valid) return false;

  // all pass - get the user
  const user = await findUser({ _id: session.user });

  if (!user) return false;

  // create new accessToken and finally return it
  const accessToken = createAccessToken({ user, session });
  return accessToken;
}

// update session
// takes in generic type 1. query , 2 update
export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
