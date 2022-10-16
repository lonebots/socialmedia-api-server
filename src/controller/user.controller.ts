import { createUser } from "../service/user.service";
import { Request, Response } from "express";
import { omit } from "lodash";
import log from '../logger';

export async function createUserHandler(req: Request, res: Response) {
  // using try catch inorder to handle the duplicate email issue
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password")); // omit the password? why?

   

  } catch (e: any) {
    // log the error
    log.error(e);

    // 409 : conflict --> throws the error when the email duplication occurs -- already registered user 
    return res.status(409).send(e.message);
  }
}
