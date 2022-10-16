// used for all the user endpoints
import { object, string, ref } from "yup";

// user creation
export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password is too short - should be 6 chars minimum")
      .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Password must match"
    ),
    email: string()
      .required("Email is required.")
      .email("Must be a valid email"),
  }),
});

// user session
export const createSessionSchema = object()
