import jwt from "jsonwebtoken";
import config from "config";
import log from "../logger";

const privateKey = config.get("privateKey") as string;

export function sign(object: object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, options);
}

// decode util -- for labeling the accessToken as expire and not expired
// defined as a wrapper around ==> jwt.verify
export function decode(token: string) {
  try {
    // verify with app privateKey
    const decoded = jwt.verify(token, privateKey);

    // if no error then the token is declared as valid
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    log.error(error);
    return {
      valid: false,
      expired: error.msg === "jwt-expired",
      decoded: null,
    };
  }
}
